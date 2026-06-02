'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// ── DONNÉES (remplacez par vos appels API) ────────────────────
const MOCK_CLIENTS   = 24;
const MOCK_SERVICES  = 6;

const MOCK_RESERVATIONS = [
  { ref: 'RES-001', client: 'Jean Dupont',  service: 'Chemise',    total: 4500, date: '2026-05-20', status: 'PENDING'     },
  { ref: 'RES-002', client: 'Marie Ngono',  service: 'Costume',    total: 5000, date: '2026-05-21', status: 'CONFIRMED'   },
  { ref: 'RES-003', client: 'Paul Biya',    service: 'Pantalon',   total: 4000, date: '2026-05-22', status: 'IN_PROGRESS' },
  { ref: 'RES-004', client: 'Aline Fouda',  service: 'Robe',       total: 6000, date: '2026-05-23', status: 'DELIVERED'   },
  { ref: 'RES-005', client: 'Eric Mbarga',  service: 'Linge',      total: 4800, date: '2026-05-24', status: 'PENDING'     },
  { ref: 'RES-006', client: 'Sophie Ateba', service: 'Couverture', total: 7000, date: '2026-05-19', status: 'CANCELLED'   },
];

const MOCK_MARITAL = [
  { label: 'Célibataire', count: 10, color: '#6c63ff' },
  { label: 'Marié·e',     count: 8,  color: '#43e97b' },
  { label: 'Divorcé·e',   count: 4,  color: '#ff6584' },
  { label: 'Veuf·ve',     count: 2,  color: '#facc15' },
];

const MOCK_TOP_SERVICES = [
  { name: 'Chemise',  count: 18, color: '#6c63ff' },
  { name: 'Pantalon', count: 14, color: '#43e97b' },
  { name: 'Costume',  count: 9,  color: '#facc15' },
  { name: 'Linge kg', count: 7,  color: '#38bdf8' },
  { name: 'Robe',     count: 5,  color: '#ff6584' },
];

const STATUS_MAP = {
  PENDING:     { label: 'Attente',   color: '#facc15', bg: '#facc1520' },
  CONFIRMED:   { label: 'Confirmée', color: '#43e97b', bg: '#43e97b20' },
  IN_PROGRESS: { label: 'En cours',  color: '#a09af8', bg: '#6c63ff20' },
  READY:       { label: 'Prête',     color: '#38bdf8', bg: '#38bdf820' },
  DELIVERED:   { label: 'Livrée',    color: '#8888a0', bg: '#8888a020' },
  CANCELLED:   { label: 'Annulée',   color: '#ff6584', bg: '#ff658420' },
};

// ── STYLES GLOBAUX ────────────────────────────────────────────
// → Copiez ce bloc dans globals.css si vous préférez ne pas
//   injecter de <style> dans le composant.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dash-fade-1    { animation: fadeUp   .4s ease .05s both; }
  .dash-fade-2    { animation: fadeUp   .4s ease .15s both; }
  .dash-fade-3    { animation: fadeUp   .4s ease .25s both; }
  .dash-fade-4    { animation: fadeUp   .4s ease .35s both; }
  .dash-fade-5    { animation: fadeUp   .4s ease .45s both; }
  .dash-fade-6    { animation: fadeUp   .4s ease .55s both; }
  .dash-stat-val  { animation: countUp  .5s ease .30s both; }

  .dash-card {
    background   : #18181c;
    border       : 1px solid #2e2e38;
    border-radius: 14px;
    padding      : 20px;
    transition   : transform .25s cubic-bezier(.4,0,.2,1),
                   border-color .25s, box-shadow .25s;
  }
  .dash-card:hover {
    transform    : translateY(-2px);
    border-color : rgba(108,99,255,.38);
    box-shadow   : 0 8px 28px rgba(108,99,255,.06);
  }

  /* SERVICE BAR */
  .dash-svc-bar {
    height     : 100%;
    border-radius: 3px;
    transition : width .8s cubic-bezier(.4,0,.2,1);
  }

  /* ── GRIDS ─────────────────────────────────────────────── */

  /* 4 colonnes — desktop */
  .dash-stat-grid {
    display              : grid;
    grid-template-columns: repeat(4, 1fr);
    gap                  : 12px;
    margin-bottom        : 24px;
  }

  /* 2 colonnes — graphiques */
  .dash-charts-row {
    display              : grid;
    grid-template-columns: 1fr 1fr;
    gap                  : 16px;
    margin-bottom        : 16px;
  }

  /* 1.6 / 1 — bas de page */
  .dash-bottom-row {
    display              : grid;
    grid-template-columns: 1.6fr 1fr;
    gap                  : 16px;
  }

  /* ── TABLET  ≤ 900px ───────────────────────────────────── */
  @media (max-width: 900px) {
    .dash-stat-grid    { grid-template-columns: repeat(2, 1fr); }
    .dash-charts-row   { grid-template-columns: 1fr; }
    .dash-bottom-row   { grid-template-columns: 1fr; }
  }

  /* ── MOBILE  ≤ 540px ───────────────────────────────────── */
  @media (max-width: 540px) {
    .dash-stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .dash-card   { padding: 14px; }
    .dash-bar-wrap { height: 100px !important; }
  }
`;

// ── HOOK : taille d'écran ─────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { isMobile: width <= 540, isTablet: width > 540 && width <= 900 };
}

// ── COMPOSANTS ────────────────────────────────────────────────

/** Carte de statistique */
function StatCard({ label, icon, iconBg, value, hint, hintColor, valueFontSize = 34, valueColor = '#f0f0f5' }) {
  return (
    <div className="dash-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#8888a0',
          textTransform: 'uppercase', letterSpacing: '.07em',
        }}>
          <Link href={`/admin/${label}`}>{label}</Link>
        </span>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>
          {icon}
        </div>
      </div>
      <div
        className="dash-stat-val"
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize   : valueFontSize,
          fontWeight : 800,
          color      : valueColor,
          lineHeight : 1.1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: hintColor || '#8888a0', fontWeight: 600, marginTop: 4 }}>
        {hint}
      </div>
    </div>
  );
}

/** Graphique en barres — réservations par statut */
function BarChart({ reservations }) {
  const statusCounts = {};
  reservations.forEach(r => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(statusCounts));
  const entries  = Object.entries(statusCounts);

  return (
    <div className="dash-card dash-fade-3">
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>
        Réservations par statut
      </div>
      <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 20 }}>Vue d'ensemble</div>

      {/* barres */}
      <div
        className="dash-bar-wrap"
        style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, paddingBottom: 4 }}
      >
        {entries.map(([key, val]) => {
          const s   = STATUS_MAP[key] || { color: '#8888a0' };
          const pct = Math.round((val / maxCount) * 100);
          return (
            <div
              key={key}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{val}</span>
              <div style={{
                width: '100%', background: s.color,
                borderRadius: '5px 5px 0 0',
                height: `${pct}%`, minHeight: 6,
                transition: 'height .6s cubic-bezier(.4,0,.2,1)',
              }} />
            </div>
          );
        })}
      </div>

      {/* labels */}
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {entries.map(([key]) => {
          const s = STATUS_MAP[key] || { label: key };
          return (
            <div key={key} style={{ flex: 1, textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#8888a0' }}>
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Graphique donut — profils clients */
function DonutChart({ maritalData, totalClients }) {
  const canvasRef = useRef(null);
  const total     = maritalData.reduce((a, m) => a + m.count, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 110, 110);

    let angle = -Math.PI / 2;
    maritalData.forEach(m => {
      const slice = (m.count / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(55, 55);
      ctx.arc(55, 55, 48, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = m.color;
      ctx.fill();
      angle += slice;
    });

    // trou
    ctx.beginPath();
    ctx.arc(55, 55, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#18181c';
    ctx.fill();

    // nombre central
    ctx.font = '800 14px "Syne", sans-serif';
    ctx.fillStyle    = '#f0f0f5';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(totalClients, 55, 55);
  }, [maritalData, totalClients, total]);

  return (
    <div className="dash-card dash-fade-4">
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>
        Profils clients
      </div>
      <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 16 }}>Par situation maritale</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <canvas ref={canvasRef} width={110} height={110} style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 120 }}>
          {maritalData.map(m => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 12, color: '#8888a0', fontWeight: 500 }}>{m.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f0f0f5' }}>
                {Math.round((m.count / total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Liste des dernières réservations */
function RecentReservations({ reservations }) {
  return (
    <div className="dash-card dash-fade-5">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5' }}>
          Dernières réservations
        </div>
        <button style={{
          fontSize: 12, fontWeight: 700, color: '#6c63ff',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans',sans-serif", padding: 0,
        }}>
          Voir tout ↗
        </button>
      </div>

      {reservations.slice(0, 5).map((r, i) => {
        const s = STATUS_MAP[r.status] || { color: '#8888a0', bg: '#8888a020', label: r.status };
        return (
          <div
            key={r.ref}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', gap: 8,
              borderBottom: i < 4 ? '1px solid #2e2e38' : 'none',
            }}
          >
            {/* infos client */}
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: '#f0f0f5',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {r.client}
              </div>
              <div style={{ fontSize: 11, color: '#8888a0', fontWeight: 500, marginTop: 1 }}>
                {r.service} · {r.date}
              </div>
            </div>

            {/* montant + badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: '#43e97b' }}>
                {r.total.toLocaleString('fr-FR')}
              </span>
              <span style={{
                padding: '3px 9px', borderRadius: 20, fontSize: 10,
                fontWeight: 700, background: s.bg, color: s.color, whiteSpace: 'nowrap',
              }}>
                {s.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Top services avec barres de progression */
function TopServices({ services }) {
  const topMax = services[0].count;
  return (
    <div className="dash-card dash-fade-6">
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>
        Top services
      </div>
      <div style={{ fontSize: 12, color: '#8888a0', fontWeight: 500, marginBottom: 16 }}>Par nombre de réservations</div>

      {services.map(s => {
        const pct = Math.round((s.count / topMax) * 100);
        return (
          <div key={s.name} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f5' }}>{s.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.count}</span>
            </div>
            <div style={{ height: 5, background: '#222228', borderRadius: 3, overflow: 'hidden' }}>
              <div className="dash-svc-bar" style={{ width: `${pct}%`, background: s.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────
export default function DashboardPage() {
  const [dateStr, setDateStr] = useState('');
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    );
  }, []);

  const pending     = MOCK_RESERVATIONS.filter(r => r.status === 'PENDING').length;
  const totalRevenu = MOCK_RESERVATIONS.reduce((a, r) => a + r.total, 0);

  return (
    <>
      {/* Styles globaux — à déplacer dans globals.css en production */}
      <style>{GLOBAL_CSS}</style>

      <div style={{
        background  : '#0f0f11',
        minHeight   : '100vh',
        padding     : isMobile ? '20px 16px' : '32px 28px',
        fontFamily  : "'DM Sans', sans-serif",
      }}>

        {/* ── HEADER ───────────────────────────────────────── */}
        <div
          className="dash-fade-1"
          style={{
            display       : 'flex',
            flexDirection : isMobile ? 'column' : 'row',
            alignItems    : isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            marginBottom  : isMobile ? 20 : 32,
            gap           : isMobile ? 10 : 0,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#8888a0', fontWeight: 600, marginBottom: 4 }}>
              Bienvenue 👋
            </div>
            <h1 style={{
              fontFamily   : "'Syne', sans-serif",
              fontSize     : isMobile ? 26 : 34,
              fontWeight   : 800,
              color        : '#f0f0f5',
              letterSpacing: '-.03em',
              lineHeight   : 1,
              margin       : 0,
            }}>
              Tableau de bord
            </h1>
          </div>

          <div style={{
            fontSize  : 12, color: '#8888a0', fontWeight: 600,
            background: '#18181c', border: '1px solid #2e2e38',
            padding   : '8px 14px', borderRadius: 8,
          }}>
            {dateStr}
          </div>
        </div>

        {/* ── STAT CARDS ───────────────────────────────────── */}
        <div className="dash-stat-grid dash-fade-2">
          <StatCard
            label="clients"       icon="👥" iconBg="#6c63ff20"
            value={MOCK_CLIENTS}
            hint="↑ 12% ce mois"  hintColor="#43e97b"
            valueFontSize={isMobile ? 28 : 34}
          />
          <StatCard
            label="services"      icon="🧺" iconBg="#43e97b20"
            value={MOCK_SERVICES}
            hint="Catalogue actif"
            valueFontSize={isMobile ? 28 : 34}
          />
          <StatCard
            label="reservations"  icon="📋" iconBg="#facc1520"
            value={MOCK_RESERVATIONS.length}
            hint={`${pending} en attente`} hintColor="#facc15"
            valueFontSize={isMobile ? 28 : 34}
          />
          <StatCard
            label="Revenus"       icon="💰" iconBg="#38bdf820"
            value={totalRevenu.toLocaleString('fr-FR')}
            valueFontSize={isMobile ? 20 : 28} valueColor="#38bdf8"
            hint="FCFA total"
          />
        </div>

        {/* ── GRAPHIQUES ───────────────────────────────────── */}
        <div className="dash-charts-row">
          <BarChart reservations={MOCK_RESERVATIONS} />
          <DonutChart maritalData={MOCK_MARITAL} totalClients={MOCK_CLIENTS} />
        </div>

        {/* ── RÉSERVATIONS + TOP SERVICES ──────────────────── */}
        <div className="dash-bottom-row">
          <RecentReservations reservations={MOCK_RESERVATIONS} />
          <TopServices        services={MOCK_TOP_SERVICES} />
        </div>

      </div>
    </>
  );
}