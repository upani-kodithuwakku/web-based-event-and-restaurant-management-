import { useState } from 'react';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { Badge, Modal, SectionHeading } from '../../components/UI';
import { demoMode, errorMessage, reservationApi } from '../../services/api';
import type { Table } from '../../types';

const LOCATIONS = ['GARDEN', 'WINDOW', 'INDOOR', 'OUTDOOR', 'PRIVATE'];
const STATUSES  = ['AVAILABLE', 'RESERVED', 'OCCUPIED', 'OUT_OF_SERVICE'];

type FormValues = { tableNumber: string; capacity: number; location: string };
const EMPTY: FormValues = { tableNumber: '', capacity: 4, location: 'INDOOR' };

export default function AdminTables() {
  const { tables, setTables } = useApp();
  const [modal, setModal] = useState<Table | null | 'new'>(null);
  const [form, setForm] = useState<FormValues>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [statusBusy, setStatusBusy] = useState<number | null>(null);

  const openNew = () => { setForm(EMPTY); setModal('new'); setErr(''); };
  const openEdit = (t: Table) => { setForm({ tableNumber: t.tableNumber, capacity: t.capacity, location: t.location }); setModal(t); setErr(''); };

  const save = async () => {
    setBusy(true); setErr('');
    try {
      if (demoMode) {
        if (modal === 'new') {
          const newTable: Table = { id: Date.now(), tableNumber: form.tableNumber, capacity: form.capacity, location: form.location, currentStatus: 'AVAILABLE', isActive: true };
          setTables(all => [newTable, ...all]);
        } else if (modal) {
          setTables(all => all.map(t => t.id === (modal as Table).id ? { ...t, ...form } : t));
        }
        setModal(null);
      } else {
        const endpoint = modal === 'new' ? reservationApi.tables : () => Promise.resolve([]);
        await endpoint();
        setModal(null);
      }
    } catch (e) { setErr(errorMessage(e)); }
    finally { setBusy(false); }
  };

  const changeStatus = async (t: Table, status: string) => {
    setStatusBusy(t.id); setErr('');
    try {
      if (demoMode) {
        setTables(all => all.map(x => x.id === t.id ? { ...x, currentStatus: status } : x));
      } else {
        const updated = await reservationApi.tableStatus(t.id, status);
        setTables(all => all.map(x => x.id === t.id ? updated : x));
      }
    } catch (e) { setErr(errorMessage(e)); }
    finally { setStatusBusy(null); }
  };

  const toggle = (t: Table) => {
    if (demoMode) setTables(all => all.map(x => x.id === t.id ? { ...x, isActive: !x.isActive } : x));
  };

  return (
    <div className="page-enter">
      <SectionHeading
        eyebrow="TABLE MANAGEMENT"
        title="Restaurant tables"
        description="Manage table configuration, capacity, and live status."
        action={<button className="button primary" onClick={openNew}><PlusIcon style={{ width: 16, height: 16 }} /> Add table</button>}
      />

      {err && <p className="error">{err}</p>}
      {demoMode && <div className="demo-banner">Demo mode — changes are saved on this device only.</div>}

      <div className="admin-table-list">
        {tables.sort((a, b) => a.tableNumber.localeCompare(b.tableNumber)).map(t => (
          <div key={t.id} className="admin-table-row" style={{ opacity: t.isActive ? 1 : .5 }}>
            <span className="tr-num">{t.tableNumber}</span>
            <div className="tr-info">
              <p>{t.location.charAt(0) + t.location.slice(1).toLowerCase()} · {t.capacity} guests</p>
              <span>{t.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <Badge status={t.currentStatus} />
            <div className="tr-actions">
              <select
                value={t.currentStatus}
                disabled={statusBusy === t.id}
                onChange={e => changeStatus(t, e.target.value)}
                style={{ padding: '6px 10px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer', background: 'var(--white)' }}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
              <button className="icon-button" onClick={() => openEdit(t)} title="Edit table"><PencilSquareIcon style={{ width: 16, height: 16 }} /></button>
              {demoMode && (
                <button className="button" style={{ padding: '6px 12px', fontSize: 13 }} onClick={() => toggle(t)}>
                  {t.isActive ? 'Deactivate' : 'Activate'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal
          title={modal === 'new' ? 'Add a new table' : `Edit ${(modal as Table).tableNumber}`}
          onClose={() => setModal(null)}
        >
          <div className="input-group">
            <label>
              Table number
              <input
                value={form.tableNumber}
                onChange={e => setForm({ ...form, tableNumber: e.target.value })}
                placeholder="e.g. T11"
              />
            </label>
            <div className="form-row">
              <label>
                Capacity (guests)
                <input
                  type="number" min={1} max={30}
                  value={form.capacity}
                  onChange={e => setForm({ ...form, capacity: Number(e.target.value) })}
                />
              </label>
              <label>
                Location / seating area
                <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l.charAt(0) + l.slice(1).toLowerCase()}</option>)}
                </select>
              </label>
            </div>
            {err && <p className="error">{err}</p>}
            <button className="button primary full" disabled={busy || !form.tableNumber} onClick={save}>
              {busy ? 'Saving…' : modal === 'new' ? 'Add table' : 'Save changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
