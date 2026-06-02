'use client';
// app/(ADMIN)/admin/clients/page.js
import { useState, useEffect } from 'react';

// ── STYLES ────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
  .page-anim  { animation: fadeUp .35s ease both }
  .card-hover { transition: all .25s cubic-bezier(.4,0,.2,1) }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 32px #6c63ff18; border-color: #6c63ff !important }
  .pulse-1 { animation: pulse 1.4s ease-in-out 0s   infinite }
  .pulse-2 { animation: pulse 1.4s ease-in-out 0.2s infinite }
  .pulse-3 { animation: pulse 1.4s ease-in-out 0.4s infinite }
  .btn-action { transition: all .2s; cursor: pointer }
  .btn-edit:hover   { background: #6c63ff18 !important; border-color: #6c63ff !important }
  .btn-delete:hover { background: #ff658418 !important; border-color: #ff6584 !important }
`;

// ── CONSTANTS ─────────────────────────────────────────────────
const AVATAR_COLORS = [
  { bg: '#6c63ff20', color: '#a09af8' },
  { bg: '#43e97b20', color: '#43e97b' },
  { bg: '#ff658420', color: '#ff8fab' },
  { bg: '#facc1520', color: '#facc15' },
  { bg: '#38bdf820', color: '#38bdf8' },
];

const MARITAL_MAP = {
  SINGLE:   { label: 'Célibataire', bg: '#6c63ff20', color: '#a09af8' },
  MARRIED:  { label: 'Marié·e',     bg: '#43e97b20', color: '#43e97b' },
  DIVORCED: { label: 'Divorcé·e',   bg: '#ff658420', color: '#ff8fab' },
  WIDOWED:  { label: 'Veuf·ve',     bg: '#facc1520', color: '#facc15' },
};

const AGE_MAP = {
  FROM_18_TO_25: '18 – 25 ans',
  FROM_26_TO_35: '26 – 35 ans',
  FROM_36_TO_45: '36 – 45 ans',
  FROM_46_TO_60: '46 – 60 ans',
  FROM_60_PLUS:  '60+ ans',
};

// ── HELPERS ───────────────────────────────────────────────────
function initials(name) {
  return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
}

// ── SUB COMPONENTS ────────────────────────────────────────────
function Dots() {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'center', padding: '60px 0', justifyContent: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} className={`pulse-${i + 1}`} style={{ width: 9, height: 9, borderRadius: '50%', background: '#8888a0' }} />
      ))}
    </div>
  );
}

function ClientCard({ client, index, onDelete }) {
  const av  = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const mar = MARITAL_MAP[client.marital_status] || null;
  const age = AGE_MAP[client.age_interval] || null;

  return (
    <div className="card-hover" style={{
      background: '#18181c', border: '1px solid #2e2e38',
      borderRadius: 14, padding: 20, fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Avatar */}
      <div style={{
        width: 46, height: 46, borderRadius: '50%',
        background: av.bg, color: av.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800,
        marginBottom: 14,
      }}>
        {initials(client.name)}
      </div>

      {/* Name */}
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>
        {client.name}
      </div>

      {/* Numero */}
      <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 3 }}>
        📞 {client.numero}
      </div>

      {/* Address */}
      {client.address && (
        <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 3 }}>
          📍 {client.address}
        </div>
      )}

      {/* Profession */}
      {client.profession && (
        <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 3 }}>
          💼 {client.profession}
        </div>
      )}

      {/* Email */}
      {client.email && (
        <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 3 }}>
          ✉️ {client.email}
        </div>
      )}

      {/* Age */}
      {age && (
        <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 8 }}>
          🎂 {age}
        </div>
      )}

      {/* Marital badge */}
      {mar && (
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 700,
          background: mar.bg, color: mar.color, marginTop: 4,
        }}>
          {mar.label}
        </span>
      )}

      {/* Delete */}
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #2e2e38', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(client.c_id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
            background: 'transparent', color: '#ff8fab',
            border: '1px solid #ff658440', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          🗑 Supprimer
        </button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');

  // ── Fetch all clients ──────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch('/api/clients');
        const data = await res.json();
        setClients(data.clients || []);
        setFiltered(data.clients || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Search filter ──────────────────────────────────────────
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      clients.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.numero?.includes(q) ||
        c.profession?.toLowerCase().includes(q) ||
        c.address?.toLowerCase().includes(q)
      )
    );
  }, [search, clients]);

  // ── Delete client ──────────────────────────────────────────
  async function handleDelete(id) {
    if (!confirm('Supprimer ce client ?')) return;
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    setClients(prev => prev.filter(c => c.c_id !== id));
  }

  return (
    <>
      <style>{css}</style>

      <div className="page-anim" style={{ padding: '32px 28px', minHeight: '100vh', background: '#0f0f11' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: '#f0f0f5', letterSpacing: '-.03em' }}>
            Clients
          </h1>
          <p style={{ fontSize: 13, color: '#8888a0', fontWeight: 500, marginTop: 4 }}>
            Gérer tous les clients enregistrés
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { label: 'Total clients',    value: clients.length },
            { label: 'Avec profession',  value: clients.filter(c => c.profession).length },
            { label: 'Avec email',       value: clients.filter(c => c.email).length },
          ].map(s => (
            <div key={s.label} style={{
              background: '#18181c', border: '1px solid #2e2e38',
              borderRadius: 8, padding: '14px 20px', flex: 1, minWidth: 120,
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: '#f0f0f5' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: '#8888a0', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
          background: '#18181c', border: '1px solid #2e2e38',
          borderRadius: 8, padding: '10px 16px', maxWidth: 360,
        }}>
          <span>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: '#f0f0f5', fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 500, width: '100%',
            }}
          />
        </div>

        {/* Grid */}
        {loading ? <Dots /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.length === 0
              ? <p style={{ color: '#8888a0', fontSize: 14 }}>Aucun client trouvé.</p>
              : filtered.map((c, i) => (
                  <ClientCard key={c.c_id} client={c} index={i} onDelete={handleDelete} />
                ))
            }
          </div>
        )}
      </div>
    </>
  );
}