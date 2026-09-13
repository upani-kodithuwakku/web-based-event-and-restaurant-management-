import { useState } from 'react';
import { PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal, SectionHeading } from '../../components/UI';
import { useStored } from '../../context/AppContext';

type InventoryItem = {
  id: number;
  name: string;
  unit: string;
  currentQuantity: number;
  reorderLevel: number;
  isActive: boolean;
};

const SEED_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Olive oil',          unit: 'litre',  currentQuantity: 12,  reorderLevel: 5,  isActive: true },
  { id: 2, name: 'Atlantic salmon',    unit: 'kg',     currentQuantity: 3.5, reorderLevel: 5,  isActive: true },
  { id: 3, name: 'Burrata cheese',     unit: 'kg',     currentQuantity: 2,   reorderLevel: 2,  isActive: true },
  { id: 4, name: 'Heirloom tomatoes',  unit: 'kg',     currentQuantity: 8,   reorderLevel: 3,  isActive: true },
  { id: 5, name: 'Beef mince',         unit: 'kg',     currentQuantity: 15,  reorderLevel: 5,  isActive: true },
  { id: 6, name: 'Mozzarella',         unit: 'kg',     currentQuantity: 6,   reorderLevel: 3,  isActive: true },
  { id: 7, name: 'Fresh basil',        unit: 'bunch',  currentQuantity: 4,   reorderLevel: 5,  isActive: true },
  { id: 8, name: 'Vanilla ice cream',  unit: 'litre',  currentQuantity: 4,   reorderLevel: 2,  isActive: true },
  { id: 9, name: 'Chocolate (dark)',   unit: 'kg',     currentQuantity: 1.5, reorderLevel: 2,  isActive: true },
  { id: 10, name: 'Sparkling water',   unit: 'bottle', currentQuantity: 48,  reorderLevel: 20, isActive: true },
];

export default function AdminInventory() {
  const [items, setItems] = useStored<InventoryItem[]>('gather-inventory', SEED_ITEMS);
  const [modal, setModal] = useState<InventoryItem | 'new' | null>(null);
  const [form, setForm] = useState({ name: '', unit: 'kg', currentQuantity: 0, reorderLevel: 5 });
  const [adj, setAdj] = useState<{ id: number; value: string } | null>(null);

  const lowStock = items.filter(i => i.isActive && i.currentQuantity <= i.reorderLevel);

  const save = () => {
    if (modal === 'new') {
      setItems(all => [{ id: Date.now(), ...form, isActive: true }, ...all]);
    } else if (modal) {
      setItems(all => all.map(i => i.id === (modal as InventoryItem).id ? { ...i, ...form } : i));
    }
    setModal(null);
  };

  const adjust = (id: number, delta: number) => {
    setItems(all => all.map(i => i.id === id ? { ...i, currentQuantity: Math.max(0, parseFloat((i.currentQuantity + delta).toFixed(3))) } : i));
  };

  const pct = (item: InventoryItem) => Math.min(100, Math.round((item.currentQuantity / (item.reorderLevel * 3)) * 100));

  return (
    <div className="page-enter">
      <SectionHeading
        eyebrow="INVENTORY"
        title="Stock management"
        description="Monitor stock levels, set reorder thresholds, and track movements."
        action={
          <button className="button primary" onClick={() => { setForm({ name: '', unit: 'kg', currentQuantity: 0, reorderLevel: 5 }); setModal('new'); }}>
            <PlusIcon style={{ width: 16, height: 16 }} /> Add item
          </button>
        }
      />

      {lowStock.length > 0 && (
        <div className="alert-banner">
          <ExclamationTriangleIcon />
          {lowStock.length} item{lowStock.length > 1 ? 's' : ''} at or below reorder level:
          {' '}{lowStock.map(i => i.name).join(', ')}
        </div>
      )}

      <div className="demo-banner">Demo mode — stock adjustments are saved locally. Purchase order integration available in full backend mode.</div>

      <div className="inventory-grid">
        {items.filter(i => i.isActive).map(item => {
          const low = item.currentQuantity <= item.reorderLevel;
          return (
            <div key={item.id} className={`inventory-card${low ? ' low-stock' : ''}`}>
              <div className="row-between">
                <h3>{item.name}</h3>
                {low && <ExclamationTriangleIcon style={{ width: 16, height: 16, color: 'var(--arches)' }} />}
              </div>
              <p className="small muted">{item.unit} · reorder at {item.reorderLevel}</p>
              <div className="stock-bar">
                <div className="stock-fill" style={{ width: `${pct(item)}%` }} />
              </div>
              <div className="row-between">
                <b style={{ fontSize: 20, fontWeight: 800 }}>{item.currentQuantity}</b>
                <span className="small muted">{item.unit}</span>
              </div>
              <div className="row-between" style={{ marginTop: 4 }}>
                <button
                  className="button"
                  style={{ padding: '5px 12px', fontSize: 13 }}
                  onClick={() => { setForm({ name: item.name, unit: item.unit, currentQuantity: item.currentQuantity, reorderLevel: item.reorderLevel }); setModal(item); }}
                >
                  Edit
                </button>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="button" style={{ padding: '5px 10px', fontSize: 13 }} onClick={() => adjust(item.id, -1)}>−1</button>
                  <button className="button primary" style={{ padding: '5px 10px', fontSize: 13 }} onClick={() => adjust(item.id, 10)}>+10</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modal !== null && (
        <Modal
          title={modal === 'new' ? 'Add inventory item' : `Edit ${(modal as InventoryItem).name}`}
          onClose={() => setModal(null)}
        >
          <div className="input-group">
            <label>Item name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Olive oil" /></label>
            <div className="form-row">
              <label>Unit<select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                {['kg', 'g', 'litre', 'ml', 'bottle', 'bunch', 'unit', 'pack', 'dozen'].map(u => <option key={u}>{u}</option>)}
              </select></label>
              <label>Current quantity<input type="number" min={0} step="0.001" value={form.currentQuantity} onChange={e => setForm({ ...form, currentQuantity: Number(e.target.value) })} /></label>
              <label>Reorder level<input type="number" min={0} step="0.001" value={form.reorderLevel} onChange={e => setForm({ ...form, reorderLevel: Number(e.target.value) })} /></label>
            </div>
            <button className="button primary full" disabled={!form.name} onClick={save}>
              {modal === 'new' ? 'Add item' : 'Save changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
