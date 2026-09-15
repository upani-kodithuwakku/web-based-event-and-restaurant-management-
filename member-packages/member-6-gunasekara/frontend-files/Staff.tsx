import { useState } from 'react';
import { format, parseISO, addDays } from 'date-fns';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Modal, SectionHeading, Badge } from '../../components/UI';
import { useStored } from '../../context/AppContext';

type StaffMember = { id: number; name: string; role: string; employeeCode: string; status: 'ACTIVE' | 'INACTIVE' };
type Shift = { id: number; shiftDate: string; startTime: string; endTime: string; role: string; assignedStaff: number[] };

const TODAY = format(new Date(), 'yyyy-MM-dd');
const ROLES = ['WAITER', 'KITCHEN_STAFF', 'CASHIER', 'EVENT_COORDINATOR', 'INVENTORY_MANAGER', 'MANAGER'];

const SEED_STAFF: StaffMember[] = [
  { id: 1, name: 'Kasun Perera',   role: 'WAITER',            employeeCode: 'EMP-001', status: 'ACTIVE' },
  { id: 2, name: 'Nimal Silva',    role: 'KITCHEN_STAFF',     employeeCode: 'EMP-002', status: 'ACTIVE' },
  { id: 3, name: 'Ayesha Fernando',role: 'CASHIER',           employeeCode: 'EMP-003', status: 'ACTIVE' },
  { id: 4, name: 'Ruwan Bandara',  role: 'WAITER',            employeeCode: 'EMP-004', status: 'ACTIVE' },
  { id: 5, name: 'Dilini Jayawardena', role: 'EVENT_COORDINATOR', employeeCode: 'EMP-005', status: 'ACTIVE' },
];

const SEED_SHIFTS: Shift[] = [
  { id: 1, shiftDate: TODAY, startTime: '10:00', endTime: '16:00', role: 'WAITER', assignedStaff: [1, 4] },
  { id: 2, shiftDate: TODAY, startTime: '16:00', endTime: '23:00', role: 'WAITER', assignedStaff: [1] },
  { id: 3, shiftDate: TODAY, startTime: '10:00', endTime: '18:00', role: 'KITCHEN_STAFF', assignedStaff: [2] },
  { id: 4, shiftDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'), startTime: '10:00', endTime: '18:00', role: 'WAITER', assignedStaff: [4] },
];

export default function AdminStaff() {
  const [staff, setStaff] = useStored<StaffMember[]>('gather-staff', SEED_STAFF);
  const [shifts, setShifts] = useStored<Shift[]>('gather-shifts', SEED_SHIFTS);
  const [tab, setTab] = useState<'staff' | 'shifts'>('staff');
  const [date, setDate] = useState(TODAY);
  const [modal, setModal] = useState<'staff' | 'shift' | null>(null);
  const [staffForm, setStaffForm] = useState({ name: '', role: 'WAITER', employeeCode: '' });
  const [shiftForm, setShiftForm] = useState({ shiftDate: TODAY, startTime: '10:00', endTime: '18:00', role: 'WAITER' });

  const todayShifts = shifts.filter(s => s.shiftDate === date);
  const activeStaff = staff.filter(s => s.status === 'ACTIVE');

  const addStaff = () => {
    setStaff(all => [{ id: Date.now(), ...staffForm, status: 'ACTIVE' }, ...all]);
    setModal(null);
  };

  const addShift = () => {
    setShifts(all => [{ id: Date.now(), ...shiftForm, assignedStaff: [] }, ...all]);
    setModal(null);
  };

  const assign = (shiftId: number, staffId: number) => {
    setShifts(all => all.map(s => {
      if (s.id !== shiftId) return s;
      const already = s.assignedStaff.includes(staffId);
      return { ...s, assignedStaff: already ? s.assignedStaff.filter(x => x !== staffId) : [...s.assignedStaff, staffId] };
    }));
  };

  const initials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="page-enter">
      <SectionHeading
        eyebrow="STAFF MANAGEMENT"
        title="Team & scheduling"
        description="Manage staff profiles, assign shifts, and track attendance."
        action={
          <div className="button-row">
            <button className="button" onClick={() => { setStaffForm({ name: '', role: 'WAITER', employeeCode: '' }); setModal('staff'); }}>
              <PlusIcon style={{ width: 14, height: 14 }} /> Add staff
            </button>
            <button className="button primary" onClick={() => { setShiftForm({ shiftDate: date, startTime: '10:00', endTime: '18:00', role: 'WAITER' }); setModal('shift'); }}>
              <PlusIcon style={{ width: 14, height: 14 }} /> Add shift
            </button>
          </div>
        }
      />

      <div className="tabs">
        <button className={tab === 'staff' ? 'active' : ''} onClick={() => setTab('staff')}>
          <UserGroupIcon style={{ width: 14, height: 14, display: 'inline', marginRight: 6 }} />
          Staff ({activeStaff.length})
        </button>
        <button className={tab === 'shifts' ? 'active' : ''} onClick={() => setTab('shifts')}>
          Shift schedule
        </button>
      </div>

      <div className="demo-banner">Demo mode — staff and shift data are stored locally.</div>

      {tab === 'staff' && (
        <div className="staff-grid" style={{ marginTop: 24 }}>
          {activeStaff.map(s => (
            <div key={s.id} className="staff-card">
              <div className="staff-avatar">{initials(s.name)}</div>
              <h3>{s.name}</h3>
              <p>{s.role.replace('_', ' ').toLowerCase()}</p>
              <p className="small" style={{ color: 'var(--gray-300)' }}>{s.employeeCode}</p>
              <Badge status={s.status} />
              <button
                className="text-button"
                onClick={() => setStaff(all => all.map(x => x.id === s.id ? { ...x, status: x.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : x))}
              >
                {s.status === 'ACTIVE' ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'shifts' && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8, textTransform: 'none', letterSpacing: 0, fontSize: 14, fontWeight: 600 }}>
              Date:
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '7px 12px', fontSize: 14, background: 'var(--white)' }} />
            </label>
          </div>
          {todayShifts.length === 0 ? (
            <p className="muted small">No shifts scheduled for {date}.</p>
          ) : (
            <div className="shift-list">
              {todayShifts.map(shift => (
                <div key={shift.id} className="shift-row">
                  <span className="shift-time">{shift.startTime} – {shift.endTime}</span>
                  <div className="shift-body">
                    <p>{shift.role.replace('_', ' ').toLowerCase()}</p>
                    <span>
                      {shift.assignedStaff.length > 0
                        ? shift.assignedStaff.map(id => staff.find(s => s.id === id)?.name).filter(Boolean).join(', ')
                        : 'Unassigned'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {staff.filter(s => s.role === shift.role && s.status === 'ACTIVE').map(s => (
                      <button
                        key={s.id}
                        onClick={() => assign(shift.id, s.id)}
                        style={{
                          padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                          border: '1.5px solid',
                          borderColor: shift.assignedStaff.includes(s.id) ? 'var(--babu)' : 'var(--gray-200)',
                          background: shift.assignedStaff.includes(s.id) ? 'var(--babu-light)' : 'var(--white)',
                          color: shift.assignedStaff.includes(s.id) ? 'var(--babu)' : 'var(--hof)',
                        }}
                      >
                        {initials(s.name)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {modal === 'staff' && (
        <Modal title="Add staff member" onClose={() => setModal(null)}>
          <div className="input-group">
            <label>Full name<input value={staffForm.name} onChange={e => setStaffForm({ ...staffForm, name: e.target.value })} placeholder="e.g. Kasun Perera" /></label>
            <div className="form-row">
              <label>Role<select value={staffForm.role} onChange={e => setStaffForm({ ...staffForm, role: e.target.value })}>
                {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
              </select></label>
              <label>Employee code<input value={staffForm.employeeCode} onChange={e => setStaffForm({ ...staffForm, employeeCode: e.target.value })} placeholder="EMP-006" /></label>
            </div>
            <button className="button primary full" disabled={!staffForm.name} onClick={addStaff}>Add staff member</button>
          </div>
        </Modal>
      )}

      {modal === 'shift' && (
        <Modal title="Schedule a shift" onClose={() => setModal(null)}>
          <div className="input-group">
            <label>Date<input type="date" value={shiftForm.shiftDate} onChange={e => setShiftForm({ ...shiftForm, shiftDate: e.target.value })} /></label>
            <div className="form-row">
              <label>Start time<input type="time" value={shiftForm.startTime} onChange={e => setShiftForm({ ...shiftForm, startTime: e.target.value })} /></label>
              <label>End time<input type="time" value={shiftForm.endTime} onChange={e => setShiftForm({ ...shiftForm, endTime: e.target.value })} /></label>
            </div>
            <label>Role required<select value={shiftForm.role} onChange={e => setShiftForm({ ...shiftForm, role: e.target.value })}>
              {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
            </select></label>
            <button className="button primary full" onClick={addShift}>Create shift</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
