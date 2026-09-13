import { format } from 'date-fns';
import { ChartBarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../../components/UI';
import { money } from '../../data';

export default function AdminReports() {
  const { reservations, tables, orders, events } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');

  const todayRes   = reservations.filter(r => r.reservationDate === today);
  const confirmed  = reservations.filter(r => r.status === 'CONFIRMED').length;
  const completed  = reservations.filter(r => r.status === 'COMPLETED').length;
  const cancelled  = reservations.filter(r => r.status === 'CANCELLED').length;
  const noShow     = reservations.filter(r => r.status === 'NO_SHOW').length;

  const paidOrders = orders.filter(o => o.paid);
  const revenue    = paidOrders.reduce((s, o) => s + o.total, 0);

  const available  = tables.filter(t => t.currentStatus === 'AVAILABLE').length;
  const occupied   = tables.filter(t => t.currentStatus === 'OCCUPIED').length;

  const approvedEvents = events.filter(e => e.status === 'APPROVED').length;
  const pendingEvents  = events.filter(e => e.status === 'PENDING').length;

  const byLocation: Record<string, number> = {};
  reservations.forEach(r => {
    byLocation[r.table.location] = (byLocation[r.table.location] || 0) + 1;
  });

  return (
    <div className="page-enter">
      <SectionHeading
        eyebrow="ANALYTICS"
        title="Reports & overview"
        description={`System snapshot as of ${format(new Date(), 'EEEE, d MMMM yyyy')}.`}
        action={
          <button className="button" disabled>
            <ArrowDownTrayIcon style={{ width: 14, height: 14 }} /> Export (coming soon)
          </button>
        }
      />

      <div className="demo-banner">
        <ChartBarIcon style={{ width: 16, height: 16, display: 'inline', marginRight: 6 }} />
        Demo mode — figures reflect locally stored data. Full reporting connects to the backend API.
      </div>

      <div className="report-grid">
        <div className="report-card">
          <h3>Reservation summary</h3>
          <div className="report-row"><span>Total reservations</span><b>{reservations.length}</b></div>
          <div className="report-row"><span>Today's reservations</span><b>{todayRes.length}</b></div>
          <div className="report-row"><span>Confirmed</span><b style={{ color: 'var(--babu)' }}>{confirmed}</b></div>
          <div className="report-row"><span>Completed</span><b>{completed}</b></div>
          <div className="report-row"><span>Cancelled</span><b style={{ color: 'var(--rausch)' }}>{cancelled}</b></div>
          <div className="report-row"><span>No-show</span><b style={{ color: 'var(--hof)' }}>{noShow}</b></div>
        </div>

        <div className="report-card">
          <h3>Table utilisation</h3>
          <div className="report-row"><span>Total tables</span><b>{tables.length}</b></div>
          <div className="report-row"><span>Available now</span><b style={{ color: 'var(--babu)' }}>{available}</b></div>
          <div className="report-row"><span>Occupied now</span><b style={{ color: 'var(--rausch)' }}>{occupied}</b></div>
          <div className="report-row"><span>Out of service</span><b>{tables.filter(t => t.currentStatus === 'OUT_OF_SERVICE').length}</b></div>
          <div className="report-row">
            <span>Utilisation rate</span>
            <b>{tables.length ? Math.round((occupied / tables.length) * 100) : 0}%</b>
          </div>
        </div>

        <div className="report-card">
          <h3>Revenue (simulated)</h3>
          <div className="report-row"><span>Total orders</span><b>{orders.length}</b></div>
          <div className="report-row"><span>Paid orders</span><b style={{ color: 'var(--babu)' }}>{paidOrders.length}</b></div>
          <div className="report-row"><span>Pending payment</span><b>{orders.filter(o => !o.paid).length}</b></div>
          <div className="report-row"><span>Simulated revenue</span><b>{money(revenue)}</b></div>
          <div className="report-row">
            <span>Avg order value</span>
            <b>{paidOrders.length ? money(Math.round(revenue / paidOrders.length)) : 'N/A'}</b>
          </div>
        </div>

        <div className="report-card">
          <h3>Event bookings</h3>
          <div className="report-row"><span>Total enquiries</span><b>{events.length}</b></div>
          <div className="report-row"><span>Approved</span><b style={{ color: 'var(--babu)' }}>{approvedEvents}</b></div>
          <div className="report-row"><span>Pending review</span><b style={{ color: 'var(--arches)' }}>{pendingEvents}</b></div>
          <div className="report-row"><span>Rejected</span><b>{events.filter(e => e.status === 'REJECTED').length}</b></div>
          <div className="report-row"><span>Cancelled</span><b>{events.filter(e => e.status === 'CANCELLED').length}</b></div>
        </div>

        <div className="report-card">
          <h3>Reservations by seating area</h3>
          {Object.entries(byLocation).length === 0 ? (
            <p className="muted small">No reservations yet.</p>
          ) : (
            Object.entries(byLocation)
              .sort(([, a], [, b]) => b - a)
              .map(([loc, count]) => (
                <div key={loc} className="report-row">
                  <span>{loc.charAt(0) + loc.slice(1).toLowerCase()}</span>
                  <b>{count} reservation{count !== 1 ? 's' : ''}</b>
                </div>
              ))
          )}
        </div>

        <div className="report-card">
          <h3>Recent reservations</h3>
          {reservations.slice(0, 5).map(r => (
            <div key={r.id} className="report-row">
              <span>{r.contactName} · {r.table.tableNumber}</span>
              <b style={{ fontSize: 12, color: 'var(--foggy)' }}>{r.reservationDate}</b>
            </div>
          ))}
          {reservations.length === 0 && <p className="muted small">No reservations yet.</p>}
        </div>
      </div>
    </div>
  );
}
