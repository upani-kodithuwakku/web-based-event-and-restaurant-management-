import { useState, useEffect } from 'react';
import { SparklesIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Badge, Empty, Modal, SectionHeading } from '../../components/UI';
import { eventCoordinatorApi, type EventBookingDto, errorMessage } from '../../services/api';
import { money } from '../../data';

const PACKAGES = [
  { name: 'The intimate gathering', type: 'Birthdays & get-togethers', min: 10, max: 30, price: 45000 },
  { name: 'A day to remember',      type: 'Weddings & engagements',   min: 30, max: 120, price: 180000 },
  { name: 'Beyond the boardroom',   type: 'Teams & corporate events',  min: 10, max: 60, price: 85000 },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<EventBookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<EventBookingDto | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true);
    try { setEvents(await eventCoordinatorApi.list()); }
    catch { setErr('Failed to load event bookings.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const approve = async (id: number) => {
    setBusy(true); setErr('');
    try {
      const updated = await eventCoordinatorApi.approve(id);
      setEvents(all => all.map(e => e.id === id ? updated : e));
      setSelected(null);
    } catch (e) { setErr(errorMessage(e)); }
    finally { setBusy(false); }
  };

  const reject = async (id: number) => {
    setBusy(true); setErr('');
    try {
      const updated = await eventCoordinatorApi.reject(id, rejectNote);
      setEvents(all => all.map(e => e.id === id ? updated : e));
      setSelected(null); setRejectNote('');
    } catch (e) { setErr(errorMessage(e)); }
    finally { setBusy(false); }
  };

  const filtered = events.filter(e => !filter || e.status === filter);

  return (
    <div className="page-enter">
      <SectionHeading
        eyebrow="EVENT COORDINATOR"
        title="Event bookings"
        description="Review enquiries, approve celebrations, and manage your event calendar."
        action={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <FunnelIcon style={{ width: 16, height: 16, color: 'var(--foggy)' }} />
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--white)', cursor: 'pointer' }}>
              <option value="">All statuses</option>
              {['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED'].map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
        }
      />

      {err && <p className="error">{err}</p>}

      {loading ? <div className="skeleton" style={{ height: 200 }} /> : filtered.length === 0 ? (
        <Empty title="No event bookings">
          <p>Event enquiries from customers will appear here for review.</p>
        </Empty>
      ) : (
        <div className="event-booking-list">
          {filtered.map(e => (
            <div key={e.id} className="event-booking-row">
              <div className="eb-info">
                <h3>{e.hallName}</h3>
                <p>
                  {e.packageName} · {String(e.eventDate)} · {e.guestCount} guests ·{' '}
                  <span style={{ fontSize: 11, color: 'var(--gray-300)' }}>{e.bookingReference}</span>
                  {e.specialRequirements && <span style={{ marginLeft: 8, fontStyle: 'italic' }}>— "{e.specialRequirements.slice(0, 60)}{e.specialRequirements.length > 60 ? '…' : ''}"</span>}
                </p>
              </div>
              <Badge status={e.status} />
              <div className="eb-actions">
                {e.status === 'PENDING' && (
                  <>
                    <button className="button primary" style={{ padding: '7px 14px', fontSize: 13 }} disabled={busy} onClick={() => approve(e.id)}>Approve</button>
                    <button className="button" style={{ padding: '7px 14px', fontSize: 13 }} onClick={() => { setSelected(e); setRejectNote(''); }}>Reject</button>
                  </>
                )}
                {e.status !== 'PENDING' && (
                  <button className="text-button" style={{ fontSize: 13 }} onClick={() => setSelected(e)}>View details</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Event packages reference</h2>
        <div className="report-grid">
          {PACKAGES.map(pkg => (
            <div key={pkg.name} className="report-card">
              <h3>{pkg.name}</h3>
              <div className="report-row"><span>Type</span><b>{pkg.type}</b></div>
              <div className="report-row"><span>Capacity</span><b>{pkg.min}–{pkg.max} guests</b></div>
              <div className="report-row"><span>Starting from</span><b>{money(pkg.price)}</b></div>
              <div className="report-row"><span>Enquiries</span><b>{events.filter(e => e.packageName === pkg.name).length}</b></div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <Modal title="Event booking details" onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="report-row"><span>Reference</span><b>{selected.bookingReference}</b></div>
            <div className="report-row"><span>Hall</span><b>{selected.hallName}</b></div>
            <div className="report-row"><span>Package</span><b>{selected.packageName}</b></div>
            <div className="report-row"><span>Date</span><b>{String(selected.eventDate)}</b></div>
            <div className="report-row"><span>Time</span><b>{String(selected.startTime).slice(0, 5)} – {String(selected.endTime).slice(0, 5)}</b></div>
            <div className="report-row"><span>Guests</span><b>{selected.guestCount}</b></div>
            <div className="report-row"><span>Deposit</span><b>{money(selected.depositAmount)}</b></div>
            <div className="report-row"><span>Status</span><Badge status={selected.status} /></div>
            {selected.specialRequirements && (
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontSize: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Special requirements</p>
                <p>{selected.specialRequirements}</p>
              </div>
            )}
            {selected.rejectionReason && (
              <div style={{ background: 'var(--rausch-light)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontSize: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Rejection reason</p>
                <p>{selected.rejectionReason}</p>
              </div>
            )}
            {selected.status === 'PENDING' && (
              <>
                <div className="divider" />
                <label>Rejection reason (optional)<textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Let the customer know why (optional)…" /></label>
                {err && <p className="error">{err}</p>}
                <div className="button-row">
                  <button className="button primary" disabled={busy} onClick={() => approve(selected.id)}>Approve booking</button>
                  <button className="button" disabled={busy} onClick={() => reject(selected.id)}>Reject</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
