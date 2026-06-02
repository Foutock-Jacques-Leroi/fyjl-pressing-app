'use client';
// app/(ADMIN)/admin/reservations/page.js
import { useState, useEffect } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
  .page-anim  { animation: fadeUp .35s ease both }
  .card-hover { transition: all .25s cubic-bezier(.4,0,.2,1) }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 32px #6c63ff12; border-color: #6c63ff60 !important }
  .pulse-1 { animation: pulse 1.4s ease-in-out 0s   infinite }
  .pulse-2 { animation: pulse 1.4s ease-in-out 0.2s infinite }
  .pulse-3 { animation: pulse 1.4s ease-in-out 0.4s infinite }
  .btn-action { transition: all .2s; cursor: pointer }
  .btn-edit:hover   { background: #6c63ff18 !important; border-color: #6c63ff !important }
  .btn-delete:hover { background: #ff658418 !important; border-color: #ff6584 !important }
  .field-input:focus { border-color: #6c63ff !important; outline: none }
`;

const STATUS_MAP = {
  PENDING:     { label: 'En attente',  bg: '#facc1520', color: '#facc15', dot: '#facc15' },
  CONFIRMED:   { label: 'Confirmée',   bg: '#43e97b20', color: '#43e97b', dot: '#43e97b' },
  IN_PROGRESS: { label: 'En cours',    bg: '#6c63ff20', color: '#a09af8', dot: '#a09af8' },
  READY:       { label: 'Prête',       bg: '#38bdf820', color: '#38bdf8', dot: '#38bdf8' },
  DELIVERED:   { label: 'Livrée',      bg: '#8888a020', color: '#8888a0', dot: '#8888a0' },
  CANCELLED:   { label: 'Annulée',     bg: '#ff658420', color: '#ff8fab', dot: '#ff8fab' },
};

function Dots() {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'center', padding: '60px 0', justifyContent: 'center' }}>
      {[0,1,2].map(i => (
        <div key={i} className={`pulse-${i+1}`} style={{ width:9, height:9, borderRadius:'50%', background:'#8888a0' }} />
      ))}
    </div>
  );
}

// ── MODAL EDIT RESERVATION ────────────────────────────────────
function EditModal({ open, onClose, onSave, reservation }) {
  const [form, setForm] = useState({ status: 'PENDING', date: '', notes: '' });

  useEffect(() => {
    if (reservation) setForm({
      status: reservation.status || 'PENDING',
      date:   reservation.date ? reservation.date.slice(0, 10) : '',
      notes:  reservation.notes || '',
    });
  }, [reservation, open]);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  const inputStyle = {
    width: '100%', background: '#222228', border: '1px solid #2e2e38',
    borderRadius: 8, padding: '10px 14px', color: '#f0f0f5',
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, outline: 'none',
    transition: 'border-color .2s',
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
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: '#f0f0f5', marginBottom: 6 }}>
          Modifier la réservation
        </h2>
        {reservation && (
          <p style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 20 }}>
            {reservation.ref} — {reservation.client}
          </p>
        )}

        {/* Status */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#8888a0', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Statut
          </label>
          <select className="field-input" value={form.status} onChange={e => set('status', e.target.value)} style={inputStyle}>
            {Object.entries(STATUS_MAP).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#8888a0', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Date de collecte
          </label>
          <input className="field-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle} />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#8888a0', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Notes
          </label>
          <input className="field-input" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Notes optionnelles" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700,
            background: '#222228', color: '#8888a0', border: '1px solid #2e2e38',
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            Annuler
          </button>
          <button onClick={() => onSave(form)} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700,
            background: '#6c63ff', color: '#fff', border: 'none',
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// ── RESERVATION CARD ──────────────────────────────────────────
function ReservationCard({ reservation, onEdit, onDelete }) {
  const s = STATUS_MAP[reservation.status] || STATUS_MAP.PENDING;

  return (
    <div className="card-hover" style={{
      background: '#18181c', border: '1px solid #2e2e38',
      borderRadius: 14, padding: 20, fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, color: '#8888a0', marginBottom: 2 }}>
            {reservation.ref || reservation.trs_id?.slice(0, 8).toUpperCase()}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5', marginBottom: 2 }}>
            {reservation.client?.name || reservation.c_id}
          </div>
          <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500 }}>
            {reservation.service?.name || reservation.srv_id}
          </div>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: s.bg, color: s.color, whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
          {s.label}
        </span>
      </div>

      {/* Details */}
      {[
        { label: 'Quantité',  value: reservation.quantity },
        { label: 'Total',     value: `${Number(reservation.total_price).toLocaleString()} FCFA`, color: '#43e97b' },
        { label: 'Date',      value: reservation.date ? new Date(reservation.date).toLocaleDateString('fr-FR') : '—' },
        ...(reservation.notes ? [{ label: 'Notes', value: reservation.notes, muted: true }] : []),
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #2e2e38' }}>
          <span style={{ fontSize: 12, color: '#8888a0', fontWeight: 600 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: r.muted ? "'DM Sans', sans-serif" : "'Syne', sans-serif", color: r.color || (r.muted ? '#8888a0' : '#f0f0f5') }}>
            {r.value}
          </span>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button className="btn-action btn-edit" onClick={() => onEdit(reservation)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
          background: 'transparent', color: '#a09af8', border: '1px solid #6c63ff40',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          ✏️ Modifier
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(reservation.trs_id)} style={{
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
export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [editing,      setEditing]      = useState(null);
  const [filter,       setFilter]       = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch('/admin/reservations/api');
        const data = await res.json();
        
        setReservations(data.reservation || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      return reservations
    }
    load();
  }, []);
  

  // ── Edit ───────────────────────────────────────────────────
  async function handleEdit(form) {
    const res = await fetch(`/admin/reservations/api/${reservations.trs_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setReservations(prev => prev.map(r => r.trs_id === editing.trs_id ? { ...r, ...data.reservation } : r));
      // setEditing(null);
    }
  }

  // ── Delete ─────────────────────────────────────────────────
  async function handleDelete(id) {
    if (!confirm('Supprimer cette réservation ?')) return;
    await fetch(`/admin/reservations/api/${id}`, { method: 'DELETE' });
    setReservations(prev => prev.filter(r => r.trs_id !== id));
  }

  // ── Filter by status ───────────────────────────────────────
  const displayed = filter === 'ALL' ? reservations : reservations.filter(r => r.status === filter);

  // ── Stats ──────────────────────────────────────────────────
  const stats = Object.entries(STATUS_MAP).map(([k, v]) => ({
    label: v.label, color: v.color,
    count: reservations.filter(r => r.status === k).length,
    key: k,
  }));

  return (
    <>
      <style>{css}</style>

      <div className="page-anim" style={{ padding: '32px 28px', minHeight: '100vh', background: '#0f0f11' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: '#f0f0f5', letterSpacing: '-.03em' }}>
            Réservations
          </h1>
          <p style={{ fontSize: 13, color: '#8888a0', fontWeight: 500, marginTop: 4 }}>
            Suivi et gestion des commandes
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {stats.map(s => (
            <div key={s.key} style={{
              background: '#18181c', border: '1px solid #2e2e38',
              borderRadius: 8, padding: '14px 20px', flex: 1, minWidth: 100, cursor: 'pointer',
              transition: 'border-color .2s',
            }}
              onClick={() => setFilter(filter === s.key ? 'ALL' : s.key)}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: s.color }}>
                {s.count}
              </div>
              <div style={{ fontSize: 11, color: '#8888a0', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {['ALL', ...Object.keys(STATUS_MAP)].map(k => {
            const active = filter === k;
            const s = STATUS_MAP[k];
            return (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: active ? (s?.bg || '#6c63ff20') : 'transparent',
                color: active ? (s?.color || '#a09af8') : '#8888a0',
                border: `1px solid ${active ? (s?.color || '#6c63ff') + '60' : '#2e2e38'}`,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all .2s',
              }}>
                {k === 'ALL' ? 'Toutes' : s.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? <Dots /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {displayed.length === 0
              ? <p style={{ color: '#8888a0', fontSize: 14 }}>Aucune réservation trouvée.</p>
              : displayed.map(r => (
                  <ReservationCard
                    key={r.trs_id} reservation={r}
                    onEdit={res => setEditing(res)}
                    onDelete={handleDelete}
                  />
                ))
            }
          </div>
        )}
      </div>

      {/* Modal */}
      <EditModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleEdit}
        reservation={editing}
      />
    </>
  );
}