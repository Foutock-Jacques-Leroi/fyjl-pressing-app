"use client"

import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError]     = useState("")
  const [focused, setFocused] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError(""); setMessage(""); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name:   String(fd.get("name")   || "").trim(),
      numero: String(fd.get("numero") || "").trim(),
    }
    if (!payload.name || !payload.numero) {
      setError("Le nom et le numéro sont requis.")
      setLoading(false); return
    }
    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) setError(data.message || "Impossible de se connecter.")
      else        { setMessage(data.message || "Connexion réussie !"); e.target.reset() }
    } catch { setError("Erreur réseau. Réessaie plus tard.") }
    finally  { setLoading(false) }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #080810;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem 1.25rem;
        }

        /* ── background layers ── */
        .lp-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,76,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,76,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .lp-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
          animation: pulse 8s ease-in-out infinite alternate;
        }
        .lp-orb-1 { width: 600px; height: 600px; background: #4f35cc14; top: -200px; left: -200px; animation-delay: 0s; }
        .lp-orb-2 { width: 500px; height: 500px; background: #7c3aed10; bottom: -150px; right: -100px; animation-delay: -3s; }
        .lp-orb-3 { width: 300px; height: 300px; background: #c026d310; top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -6s; }

        @keyframes pulse {
          from { transform: scale(1); opacity: 0.6; }
          to   { transform: scale(1.15); opacity: 1; }
        }
        .lp-orb-3 {
          animation: pulse2 8s ease-in-out infinite alternate;
          animation-delay: -6s;
        }
        @keyframes pulse2 {
          from { transform: translate(-50%,-50%) scale(1); opacity: 0.5; }
          to   { transform: translate(-50%,-50%) scale(1.2); opacity: 0.9; }
        }

        /* ── main wrapper ── */
        .lp-wrap {
          position: relative; z-index: 1;
          width: 100%; max-width: 1100px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .lp-wrap { grid-template-columns: 1fr 1fr; gap: 5rem; min-height: 80vh; }
        }

        /* ════ LEFT ════ */
        .lp-left {
          display: flex; flex-direction: column; gap: 1.75rem;
          animation: fadeUp 0.5s ease both;
        }

        .lp-brand {
          display: inline-flex; align-items: center; gap: 10px;
        }
        .lp-brand-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          box-shadow: 0 0 12px #7c3aed80;
          animation: blink 2.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .lp-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.08em;
          color: #c4b5fd; text-transform: uppercase;
        }

        .lp-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7c3aed;
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid #7c3aed30;
          background: #7c3aed12;
          width: fit-content;
          animation: fadeUp 0.5s 0.1s ease both;
        }

        .lp-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4rem);
          font-weight: 800; line-height: 1.0;
          letter-spacing: -0.025em;
          color: #f0ecff;
          animation: fadeUp 0.5s 0.15s ease both;
        }
        .lp-accent {
          display: block;
          background: linear-gradient(90deg, #a78bfa, #c084fc, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-sub {
          font-size: 15px; font-weight: 300; line-height: 1.75;
          color: #6b6580; max-width: 380px;
          animation: fadeUp 0.5s 0.2s ease both;
        }

        /* step list */
        .lp-steps {
          display: flex; flex-direction: column; gap: 12px;
          animation: fadeUp 0.5s 0.3s ease both;
        }
        .lp-step {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .lp-step-num {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          background: #1a1530;
          border: 1px solid #2d2550;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; color: #a78bfa;
        }
        .lp-step-text { font-size: 13px; color: #6b6580; line-height: 1.5; padding-top: 5px; }
        .lp-step-text strong { color: #c4b5fd; font-weight: 500; }

        .lp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffffff0d, transparent);
          animation: fadeUp 0.5s 0.4s ease both;
        }

        .lp-signup-hint {
          font-size: 14px; color: #4d4860;
          animation: fadeUp 0.5s 0.5s ease both;
        }
        .lp-signup-link {
          color: #a78bfa; text-decoration: none; font-weight: 500;
          transition: color 0.2s;
        }
        .lp-signup-link:hover { color: #c4b5fd; }

        /* ════ RIGHT (card) ════ */
        .lp-card {
          background: #0e0c1a;
          border: 1px solid #1f1a38;
          border-radius: 28px;
          padding: 2.25rem 2rem;
          position: relative; overflow: hidden;
          animation: fadeUp 0.55s 0.1s ease both;
        }
        @media (min-width: 640px) { .lp-card { padding: 2.75rem 2.5rem; } }

        /* top accent line */
        .lp-card::before {
          content: '';
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #a78bfa, #e879f9, transparent);
        }

        /* corner glow */
        .lp-card::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, #7c3aed18, transparent 70%);
          pointer-events: none;
        }

        .lp-card-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #7c3aed;
          margin-bottom: 10px;
        }
        .lp-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px; font-weight: 700; color: #ede9ff;
          margin-bottom: 6px;
        }
        .lp-card-sub {
          font-size: 13px; color: #4d4860; line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* ── inputs ── */
        .lp-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1rem; }

        .lp-label {
          font-size: 12px; font-weight: 500; letter-spacing: 0.06em;
          text-transform: uppercase; color: #6b6080;
          display: flex; align-items: center; gap: 7px;
        }

        .lp-input {
          width: 100%; height: 50px;
          background: #150f2a; border: 1px solid #251e45;
          border-radius: 14px; padding: 0 16px;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          color: #ede9ff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .lp-input::placeholder { color: #2e2650; }
        .lp-input:hover { border-color: #352d60; background: #180f30; }
        .lp-input:focus {
          border-color: #7c3aed;
          background: #180f30;
          box-shadow: 0 0 0 3px #7c3aed20;
        }
        .lp-input.focused { border-color: #7c3aed; box-shadow: 0 0 0 3px #7c3aed20; }

        /* ── alert ── */
        .lp-alert {
          border-radius: 12px; padding: 11px 15px;
          font-size: 13px; line-height: 1.5;
          margin: 0.75rem 0;
          display: flex; align-items: flex-start; gap: 9px;
        }
        .lp-alert-error   { background: #200a0a; border: 1px solid #7f1d1d50; color: #fca5a5; }
        .lp-alert-success { background: #0a1a10; border: 1px solid #14532d50; color: #86efac; }

        /* ── submit ── */
        .lp-btn {
          width: 100%; height: 52px; margin-top: 1.5rem;
          background: linear-gradient(135deg, #7c3aed, #9333ea, #a855f7);
          border: none; border-radius: 15px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
          color: #fff; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.15s, opacity 0.2s;
        }
        .lp-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent, #ffffff18, transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .lp-btn:hover:not(:disabled)::before { transform: translateX(100%); }
        .lp-btn:hover:not(:disabled)  { transform: translateY(-1px); }
        .lp-btn:active:not(:disabled) { transform: scale(0.99); }
        .lp-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .lp-btn-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center; gap: 9px;
        }

        .lp-spinner {
          width: 16px; height: 16px;
          border: 2px solid #fff4; border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── footer note ── */
        .lp-card-footer {
          margin-top: 1.5rem; padding-top: 1.25rem;
          border-top: 1px solid #1a1535;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }
        .lp-footer-note { font-size: 12px; color: #35304d; line-height: 1.5; }
        .lp-lock {
          width: 28px; height: 28px; border-radius: 8px;
          background: #1a1535; border: 1px solid #2a2450;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-bg-grid" />
        <div className="lp-orb lp-orb-1" />
        <div className="lp-orb lp-orb-2" />
        <div className="lp-orb lp-orb-3" />

        <div className="lp-wrap">

          {/* ════ LEFT ════ */}
          <div className="lp-left">
            <div className="lp-brand">
              <div className="lp-brand-dot" />
              <span className="lp-brand-name">FYJL Pressing</span>
            </div>

            <span className="lp-eyebrow">Espace client</span>

            <h1 className="lp-headline">
              Bon retour<br />
              <span className="lp-accent">parmi nous</span>
            </h1>

            <p className="lp-sub">
              Connecte-toi en quelques secondes pour retrouver tes commandes et suivre tes articles.
            </p>

            <div className="lp-steps">
              <div className="lp-step">
                <div className="lp-step-num">01</div>
                <p className="lp-step-text">Entre ton <strong>nom complet</strong> tel que saisi lors de l'inscription.</p>
              </div>
              <div className="lp-step">
                <div className="lp-step-num">02</div>
                <p className="lp-step-text">Entre ton <strong>numéro de téléphone</strong> — c'est ta clé d'accès.</p>
              </div>
              <div className="lp-step">
                <div className="lp-step-num">03</div>
                <p className="lp-step-text">Accède directement à <strong>ton tableau de bord</strong> personnel.</p>
              </div>
            </div>

            <div className="lp-divider" />

            <p className="lp-signup-hint">
              Pas encore de compte ?{" "}
              <Link href="/auth/signup" className="lp-signup-link">
                S&apos;inscrire →
              </Link>
            </p>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="lp-card">
            <p className="lp-card-eyebrow">Connexion</p>
            <h2 className="lp-card-title">Accès à votre espace</h2>
            <p className="lp-card-sub">
              Renseigne les informations de ton compte pour te connecter sans mot de passe.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="lp-field">
                <label className="lp-label" htmlFor="name">
                  <span>👤</span> Nom complet
                </label>
                <input
                  className={`lp-input${focused === "name" ? " focused" : ""}`}
                  id="name" name="name" type="text"
                  placeholder="Jean Kamga"
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                />
              </div>

              <div className="lp-field">
                <label className="lp-label" htmlFor="numero">
                  <span>📞</span> Numéro de téléphone
                </label>
                <input
                  className={`lp-input${focused === "numero" ? " focused" : ""}`}
                  id="numero" name="numero" type="tel"
                  placeholder="+237 6XX XXX XXX"
                  onFocus={() => setFocused("numero")}
                  onBlur={() => setFocused("")}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="lp-alert lp-alert-error" role="alert">
                  <span>⚠️</span><span>{error}</span>
                </div>
              )}
              {message && (
                <div className="lp-alert lp-alert-success" role="alert">
                  <span>✅</span><span>{message}</span>
                </div>
              )}

              <button className="lp-btn" type="submit" disabled={loading}>
                <span className="lp-btn-inner">
                  {loading
                    ? <><div className="lp-spinner" /> Connexion en cours…</>
                    : <>Se connecter →</>
                  }
                </span>
              </button>
            </form>

            <div className="lp-card-footer">
              <p className="lp-footer-note">
                Ton numéro ne sera jamais partagé.<br />
                Connexion sécurisée sans mot de passe.
              </p>
              <div className="lp-lock">🔒</div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}