import { useState } from 'react';
import { format } from 'date-fns';
import { SparklesIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { Badge, Empty, Modal, SectionHeading } from '../../components/UI';
import { money } from '../../data';
import type { EventBooking } from '../../types';

const PACKAGES = ['The intimate gathering', 'A day to remember', 'Beyond the boardroom'];

export default function AdminEvents() {
  const { events, setEvents, notify } = useApp();
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<EventBooking | null>(null);
  const [rejectNote, setRejectNote] = useState('');

  const approve = (id: number) => {
    setEvents(all => all.map(e => e.id === id ? { ...e, status: 'APPROVED' } : e));
    notify('Event booking approved.');
    setSelected(null);
  };

  const reject = (id: number) => {
    setEvents(all => all.map(e => e.id === id ? { ...e, status: 'REJECTED' } : e));
    notify('Event booking rejected.');
    setSelected(null);
    setRejectNote('');
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
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--white)', cursor: 'pointer' }}
            >
              <option value="">All statuses</option>
              {['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].map(s => (
                <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
        }
      />

      <div className="demo-banner">
        <SparklesIcon style={{ width: 16, height: 16, display: 'inline', marginRight: 6 }} />
        Demo mode — event requests are stored locally.
      </div>

      {filtered.length === 0 ? (
        <Empty title="No event bookings">
          <p>Event enquiries from customers will appear here for review.</p>
        </Empty>
      ) : (
        <div className="event-booking-list">
          {filtered.map(e => (
            <div key={e.id} className="event-booking-row">
              <div className="eb-info">
                <h3>{e.name}</h3>
                <p>
                  {e.package} · {e.date} · {e.guests} guests
                  {e.requests && <span style={{ marginLeft: 8, fontStyle: 'italic' }}>— "{e.requests.slice(0, 60)}{e.requests.length > 60 ? '…' : ''}"</span>}
                </p>
              </div>
              <Badge status={e.status} />
              <div className="eb-actions">
                {e.status === 'PENDING' && (
                  <>
                    <button className="button primary" style={{ padding: '7px 14px', fontSize: 13 }} onClick={() => approve(e.id)}>
                      Approve
                    </button>
                    <button className="button" style={{ padding: '7px 14px', fontSize: 13 }} onClick={() => { setSelected(e); setRejectNote(''); }}>
                      Reject
                    </button>
                  </>
                )}
                {e.status === 'APPROVED' && (
                  <button className="text-button" style={{ fontSize: 13 }} onClick={() => setSelected(e)}>
                    View details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Event packages reference</h2>
        <div className="report-grid">
          {[
            { name: 'The intimate gathering', type: 'Birthdays & get-togethers', min: 10, max: 30, price: 45000 },
            { name: 'A day to remember',      type: 'Weddings & engagements',   min: 30, max: 120, price: 180000 },
            { name: 'Beyond the boardroom',   type: 'Teams & corporate events',  min: 10, max: 60, price: 85000 },
          ].map(pkg => (
            <div key={pkg.name} className="report-card">
              <h3>{pkg.name}</h3>
              <div className="report-row"><span>Type</span><b>{pkg.type}</b></div>
              <div className="report-row"><span>Capacity</span><b>{pkg.min}–{pkg.max} guests</b></div>
              <div className="report-row"><span>Starting from</span><b>{money(pkg.price)}</b></div>
              <div className="report-row">
                <span>Enquiries</span>
                <b>{events.filter(e => e.package === pkg.name).length}</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <Modal title="Event booking details" onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="report-row"><span>Event name</span><b>{selected.name}</b></div>
            <div className="report-row"><span>Package</span><b>{selected.package}</b></div>
            <div className="report-row"><span>Date</span><b>{selected.date}</b></div>
            <div className="report-row"><span>Guests</span><b>{selected.guests}</b></div>
            <div className="report-row"><span>Status</span><Badge status={selected.status} /></div>
            {selected.requests && (
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontSize: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Special requests</p>
                <p>{selected.requests}</p>
              </div>
            )}
            {selected.status === 'PENDING' && (
              <>
                <div className="divider" />
                <label>
                  Rejection reason (optional)
                  <textarea
                    value={rejectNote}
                    onChange={e => setRejectNote(e.target.value)}
                    placeholder="Let the customer know why (optional)…"
                  />
                </label>
                <div className="button-row">
                  <button className="button primary" onClick={() => approve(selected.id)}>Approve booking</button>
                  <button className="button" onClick={() => reject(selected.id)}>Reject</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
