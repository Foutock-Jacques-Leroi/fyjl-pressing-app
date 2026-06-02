'use client';
// app/(ADMIN)/admin/services/page.js
import { useState, useEffect } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
  .page-anim  { animation: fadeUp .35s ease both }
  .card-hover { transition: all .25s cubic-bezier(.4,0,.2,1) }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 32px #43e97b12; border-color: #43e97b60 !important }
  .pulse-1 { animation: pulse 1.4s ease-in-out 0s   infinite }
  .pulse-2 { animation: pulse 1.4s ease-in-out 0.2s infinite }
  .pulse-3 { animation: pulse 1.4s ease-in-out 0.4s infinite }
  .btn-action { transition: all .2s; cursor: pointer }
  .btn-edit:hover   { background: #6c63ff18 !important; border-color: #6c63ff !important }
  .btn-delete:hover { background: #ff658418 !important; border-color: #ff6584 !important }
  .modal-overlay { transition: opacity .2s }
  .modal        { transition: transform .25s cubic-bezier(.4,0,.2,1) }
  .field-input:focus { border-color: #6c63ff !important }
`;

const ICONS = ['👔','👖','🧥','👗','🛏️','⚖️','👒','🧦','👟','🎽'];

function Dots() {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'center', padding: '60px 0', justifyContent: 'center' }}>
      {[0,1,2].map(i => (
        <div key={i} className={`pulse-${i+1}`} style={{ width:9, height:9, borderRadius:'50%', background:'#8888a0' }} />
      ))}
    </div>
  );
}

// ── MODAL ─────────────────────────────────────────────────────
function ServiceModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({ name:'', description:'', price:'', unit:'pièce' });

  useEffect(() => {
    if (initial) setForm({ name: initial.name, description: initial.description || '', price: initial.price, unit: initial.unit || 'pièce' });
    else setForm({ name:'', description:'', price:'', unit:'pièce' });
  }, [initial, open]);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  const inputStyle = {
    width: '100%', background: '#222228', border: '1px solid #2e2e38',
    borderRadius: 8, padding: '10px 14px', color: '#f0f0f5',
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
    outline: 'none', transition: 'border-color .2s',
  };

  if (!open) return null;

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: '#00000080',
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#18181c', border: '1px solid #2e2e38',
        borderRadius: 14, padding: 28, width: '90%', maxWidth: 420,
      }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: '#f0f0f5', marginBottom: 20 }}>
          {initial ? 'Modifier le service' : 'Nouveau service'}
        </h2>

        {[
          { label: 'Nom du service', key: 'name',        type: 'text',   placeholder: 'ex: Chemise' },
          { label: 'Description',   key: 'description',  type: 'text',   placeholder: 'ex: Nettoyage et repassage' },
          { label: 'Prix (FCFA)',   key: 'price',        type: 'number', placeholder: '1500' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#8888a0', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {f.label}
            </label>
            <input
              className="field-input"
              type={f.type}
              value={form[f.key]}
              onChange={e => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#8888a0', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Unité
          </label>
          <select
            value={form.unit}
            onChange={e => set('unit', e.target.value)}
            style={{ ...inputStyle }}
          >
            {['pièce','kg','lot'].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700,
            background: '#222228', color: '#8888a0', border: '1px solid #2e2e38', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Annuler
          </button>
          <button onClick={() => onSave(form)} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700,
            background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {initial ? 'Sauvegarder' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SERVICE CARD ──────────────────────────────────────────────
function ServiceCard({ service, index, onEdit, onDelete }) {
  return (
    <div className="card-hover" style={{
      background: '#18181c', border: '1px solid #2e2e38',
      borderRadius: 14, padding: 20, fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10, background: '#43e97b18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, marginBottom: 14,
      }}>
        {ICONS[index % ICONS.length]}
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>
        {service.name}
      </div>
      <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 14, lineHeight: 1.5 }}>
        {service.description || '—'}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: '#43e97b' }}>
            {Number(service.price).toLocaleString()}
            <span style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#f0f0f5' }}> FCFA</span>
          </div>
          <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500 }}>par {service.unit || 'pièce'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid #2e2e38' }}>
        <button className="btn-action btn-edit" onClick={() => onEdit(service)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
          background: 'transparent', color: '#a09af8', border: '1px solid #6c63ff40',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          ✏️ Modifier
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(service.srv_id)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
          background: 'transparent', color: '#ff8fab', border: '1px solid #ff658440',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          🗑 Supprimer
        </button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch('/admin/services/api');
        const data = await res.json();
         console.log('data complet:', data);        // ← regarde ici dans la console
      console.log('type:', typeof data);         // object ? array ?
      console.log('keys:', Object.keys(data)); 
        
        setServices(data.services);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      
        }
    load();

  }, []);

  // ── Add service ────────────────────────────────────────────
  async function handleAdd(form) {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) { setServices(prev => [data.service, ...prev]); setModal(false); }
  }

  // ── Edit service ───────────────────────────────────────────
  async function handleEdit(form) {
    const res = await fetch(`/api/services/${editing.srv_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setServices(prev => prev.map(s => s.srv_id === editing.srv_id ? data.service : s));
      setEditing(null);
    }
  }

  // ── Delete service ─────────────────────────────────────────
  async function handleDelete(id) {
    if (!confirm('Supprimer ce service ?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(prev => prev.filter(s => s.srv_id !== id));
  }

  return (
    <>
      <style>{css}</style>

      <div className="page-anim" style={{ padding: '32px 28px', minHeight: '100vh', background: '#0f0f11' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: '#f0f0f5', letterSpacing: '-.03em' }}>
              Services
            </h1>
            <p style={{ fontSize: 13, color: '#8888a0', fontWeight: 500, marginTop: 4 }}>
              Tarifs et catalogue de prestations
            </p>
          </div>
          <button onClick={() => { setEditing(null); setModal(true); }} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
            background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all .2s',
          }}>
            ＋ Ajouter un service
          </button>
        </div>

        {/* Grid */}
        {loading ? <Dots /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {services.length === 0
              ? <p style={{ color: '#8888a0', fontSize: 14 }}>Aucun service trouvé.</p>
              : services.map((s, i) => (
                  <ServiceCard
                    key={s.srv_id} service={s} index={i}
                    onEdit={srv => { setEditing(srv); setModal(true); }}
                    onDelete={handleDelete}
                  />
                ))
            }
          </div>
        )}
      </div>

      {/* Modal */}
      <ServiceModal
        open={modal}
        onClose={() => { setModal(false); setEditing(null); }}
        onSave={editing ? handleEdit : handleAdd}
        initial={editing}
      />
    </>
  );
}