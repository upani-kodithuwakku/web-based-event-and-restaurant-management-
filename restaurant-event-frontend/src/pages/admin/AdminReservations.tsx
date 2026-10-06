import { BookingPaymentBadge } from '../../components/BookingPayment';
import { customerPaymentApi, type CustomerPaymentDto } from '../../services/api';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarDaysIcon, ClockIcon, UsersIcon, MagnifyingGlassIcon, ArrowPathIcon, PhoneIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { Badge, SectionHeading } from '../../components/UI';
import { errorMessage, reservationApi, type ReservationHistory } from '../../services/api';
import { tableTitle, tableImage } from '../../data';
import BookingModal from '../../components/BookingModal';
import { Modal } from '../../components/UI';
import { useApp } from '../../context/AppContext';
import type { Reservation, Table } from '../../types';

const ACTIONS: Record<string, { label: string; next: string }[]> = {
  CONFIRMED:  [{ label: 'Check in', next: 'check-in' }, { label: 'No-show', next: 'no-show' }],
  CHECKED_IN: [{ label: 'Complete', next: 'complete' }],
  PENDING:    [{ label: 'Confirm', next: 'confirm' }, { label: 'No-show', next: 'no-show' }],
};

export default function AdminReservations() {
  const app = useApp();
  const [historyFor, setHistoryFor] = useState<Reservation>();
  const [history, setHistory] = useState<ReservationHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Table>();
  const [newTime, setNewTime] = useState('19:00');
  const [newGuests, setNewGuests] = useState(2);
  const [available, setAvailable] = useState<Table[]>([]);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [statusFilter, setStatusFilter] = useState('');
  const [rows, setRows] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<CustomerPaymentDto[]>([]);
  const [paymentError, setPaymentError] = useState('');
  useEffect(() => { let active = true; const load = () => customerPaymentApi.reservations().then(data => { if (active) { setPayments(data); setPaymentError(''); } }).catch(e => { if (active) setPaymentError(errorMessage(e)); }); void load(); const timer = window.setInterval(() => void load(), 20000); return () => { active = false; window.clearInterval(timer); }; }, []);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true); setErr('');
    try { setRows(await reservationApi.daily(date)); }
    catch (e) { setErr(errorMessage(e)); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, [date]);

  const doAction = async (id: number, action: string) => {
    setBusy(true); setErr('');
    try {
      const updated = await reservationApi.action(id, action);
      setRows(all => all.map(r => r.id === id ? updated : r));
    } catch (e) { setErr(errorMessage(e)); }
    finally { setBusy(false); }
  };

  const filtered = rows.filter(r => {
    const matchStatus = !statusFilter || r.status === statusFilter;
    const matchQuery = !query || r.contactName.toLowerCase().includes(query.toLowerCase()) || r.bookingReference.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="page-enter reservation-workspace">
      <SectionHeading eyebrow="STAFF VIEW" title="Reservation calendar" description="A clear view of every arrival, every table and every good moment." action={<div className="booking-payment-options">{app.user?.roles.some(r => ['ADMIN','MANAGER'].includes(r)) && <button className="button primary" onClick={() => { setAdding(true); setAvailable([]); }}>Add reservation</button>}<button className="button" disabled={loading} onClick={() => void load()}><ArrowPathIcon /> Refresh</button></div>} />

      {adding && !selected && <Modal title="Add a customer reservation" onClose={() => setAdding(false)}>
        <form onSubmit={async e => { e.preventDefault(); setBusy(true); setErr(''); try { const result = await reservationApi.availability(date,newTime,newGuests); setAvailable(result.availableTables); if (!result.availableTables.length) { const usable = app.tables.filter(t => t.isActive && t.currentStatus !== 'OUT_OF_SERVICE'); const largest = Math.max(0, ...usable.map(t => t.capacity)); setErr(newGuests > largest ? `No active table seats ${newGuests} guests. The largest usable table seats ${largest}. Add a larger table in Tables, or restore a suitable table when it is ready for service.` : 'All suitable tables are booked for this time. Try another date or time.'); } } catch(e) {setErr(errorMessage(e));} finally {setBusy(false);} }}>
          <div className="form-grid"><label>Date<input required type="date" value={date} onChange={e => setDate(e.target.value)} /></label><label>Time<input required type="time" min="11:00" max="21:00" value={newTime} onChange={e => setNewTime(e.target.value)} /></label><label>Guests<input required type="number" min="1" max="200" value={newGuests} onChange={e => setNewGuests(Number(e.target.value))} /></label></div>
          <button className="button primary" disabled={busy}>Check availability</button>{err && <p className="error" role="alert">{err}</p>}
        </form>
        {available.map(t => <button key={t.id} className="button" onClick={() => setSelected(t)}>{t.tableNumber} · {tableTitle(t.location, t)} · {t.capacity} seats</button>)}
      </Modal>}
      {selected && <BookingModal admin table={selected} date={date} time={newTime} guests={newGuests} onCreated={() => void load()} onClose={() => {setSelected(undefined);setAdding(false);}} />}
      {historyFor && <Modal title={`Booking history · ${historyFor.bookingReference}`} onClose={() => setHistoryFor(undefined)}>
        {historyLoading ? <p role="status">Loading history…</p> : historyError ? <p className="error" role="alert">{historyError}</p> : history.length ? <ol className="reservation-history">{history.map(h => <li key={h.id}><strong>{h.action.replace('RESERVATION_', '').replaceAll('_',' ')}</strong><p>{h.previousStatus ? `${h.previousStatus.replaceAll('_',' ')} → ` : ''}{h.status.replaceAll('_',' ')}</p><small>{new Date(h.createdAt + '+05:30').toLocaleString('en-LK', {timeZone:'Asia/Colombo'})}{h.actorId ? ` · User #${h.actorId}` : ''}</small></li>)}</ol> : <p>No recorded changes yet. History starts with changes made after this update.</p>}
      </Modal>}
      <div className="reservation-overview">
        {[
          { label: 'Reservations', value: rows.length, icon: CalendarDaysIcon },
          { label: 'Guests expected', value: rows.filter(r => !['CANCELLED','NO_SHOW'].includes(r.status)).reduce((n,r) => n+r.guestCount,0), icon: UsersIcon },
          { label: 'Awaiting arrival', value: rows.filter(r => ['CONFIRMED','PENDING'].includes(r.status)).length, icon: ClockIcon },
          { label: 'Dining now', value: rows.filter(r => r.status === 'CHECKED_IN').length, icon: TableCellsIcon },
        ].map(k => <article key={k.label}><k.icon /><div><strong>{k.value}</strong><span>{k.label}</span></div></article>)}
      </div>
      <div className="reservation-toolbar">
        <label>Service date<input required type="date" value={date} onChange={e => { if(e.target.value) setDate(e.target.value); }} /></label>
        <label>Status<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {['PENDING','CONFIRMED','CHECKED_IN','COMPLETED','CANCELLED','NO_SHOW'].map(s => <option key={s} value={s}>{s.replaceAll('_',' ')}</option>)}
        </select></label>
        <label>Find a reservation<input type="search" placeholder="Guest name or booking reference" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>

      {err && <p className="error">{err}</p>}

      {loading ? (
        <div className="skeleton" style={{ height: 200 }} />
      ) : filtered.length === 0 ? (
        <p className="muted small">No reservations found for {date}.</p>
      ) : (
        <div className="timeline">
          {filtered.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(r => (
            <div key={r.id} className="timeline-item reservation-arrival">
              <img className="reservation-arrival-photo" src={tableImage(r.table.location, r.table)} alt={tableTitle(r.table.location, r.table)} />
              <span className="tl-time">{r.startTime.slice(0, 5)}</span>
              <div className="tl-body">
                <b>{r.contactName}</b>
                <p>
                  {tableTitle(r.table.location, r.table)} · {r.table.tableNumber} ·
                  <UsersIcon style={{ width: 12, height: 12, display: 'inline', marginLeft: 4, marginRight: 2 }} />
                  {r.guestCount} ·
                  <ClockIcon style={{ width: 12, height: 12, display: 'inline', marginLeft: 6, marginRight: 2 }} />
                  {r.startTime.slice(0, 5)}
                  <span style={{ fontSize: 11, letterSpacing: '.04em', color: 'var(--gray-300)', marginLeft: 8 }}>{r.bookingReference}</span>
                </p>
                <p className="reservation-contact"><PhoneIcon />{r.contactPhone}</p>
                {r.specialRequest && <p style={{ fontStyle: 'italic', color: 'var(--foggy)', fontSize: 12 }}>"{r.specialRequest}"</p>}
              </div>
              {paymentError ? <span className="muted small">Payment status unavailable</span> : <BookingPaymentBadge payment={payments.find(p => p.tableReservationId === r.id)} deposit />}
              <Badge status={r.status} />
              <div className="tl-actions">
                <button onClick={async () => {setHistoryFor(r);setHistory([]);setHistoryError('');setHistoryLoading(true);try {setHistory(await reservationApi.history(r.id));} catch(e) {setHistoryError(errorMessage(e));} finally {setHistoryLoading(false);}}}>History</button>
                {(ACTIONS[r.status] ?? []).map(({ label, next }) => (
                  <button key={next} className={next === 'check-in' || next === 'complete' || next === 'confirm' ? 'primary' : ''} disabled={busy} onClick={() => doAction(r.id, next)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="small muted" style={{ marginTop: 16 }}>
        Showing {filtered.length} reservation{filtered.length !== 1 ? 's' : ''} for {date}.
      </p>
    </div>
  );
}
