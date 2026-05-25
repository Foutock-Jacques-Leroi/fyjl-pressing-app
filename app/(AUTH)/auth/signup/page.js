"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User, Phone, Mail, MapPin, Briefcase,
  Heart, Calendar, ArrowRight, Shirt,
  ShieldCheck, Truck, Star, Sparkles,
  ChevronRight, CheckCircle2, AlertCircle,
  TruckElectric,
} from "lucide-react"

import { Button }           from "@/components/ui/button"
import { Input }            from "@/components/ui/input"
import { Label }            from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge }            from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

/* ─── data ─── */
const maritalOptions = [
  { value: "SINGLE", label: "Célibataire" },
  { value: "COUPLE",       label: "Marié(e)"    },
  { value: "MARRIED",       label: "Pacsé(e)"    },
  { value: "DIVORCED",     label: "Divorcé(e)"  },
  { value: "WIDOWED",        label: "Veuf / Veuve"},
]
const ageOptions = [
  { value: "FROM_18_TO_25", label: "18 – 25 ans"     },
  { value: "FROM_26_TO_35", label: "26 – 35 ans"     },
  { value: "FROM_36_TO_45", label: "36 – 45 ans"     },
  { value: "FROM_46_TO_60", label: "46 – 55 ans"     },
  { value: "FROM_60_PLUS", label: "56 – 65 ans"     },
]
const perks = [
  { Icon: Truck,       label: "Collecte à domicile",   sub: "On vient chez vous" },
  { Icon: ShieldCheck, label: "Garantie qualité",       sub: "Ou on recommence"  },
  { Icon: Star,        label: "Programme fidélité",     sub: "Points à chaque dépôt" },
  { Icon: TruckElectric,  label: "Livraison à Domicile",     sub: "on vous livrer chez vous" },
]

/* ─── field config ─── */
const fields = [
  { name:"name",       label:"Nom complet",     type:"text",  placeholder:"Jean Dupont",            Icon: User      },
  { name:"numero",     label:"Téléphone",        type:"tel",   placeholder:"06 12 34 56 78",         Icon: Phone     },
  { name:"email",      label:"Email",            type:"email", placeholder:"jean@exemple.com",       Icon: Mail      },
  { name:"address",    label:"Adresse",          type:"text",  placeholder:"12 Rue de la Paix, Paris",Icon: MapPin   },
  { name:"profession", label:"Profession",       type:"text",  placeholder:"Avocat, Médecin…",       Icon: Briefcase },
]

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error,   setError]   = useState("")
  const [marital, setMarital] = useState("")
  const [age,     setAge]     = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError(""); setMessage("")
    setLoading(true)
    const fd      = new FormData(e.currentTarget)
    const payload = { ...Object.fromEntries(fd.entries()), marital_status: marital, age_interval: age }
    const labels  = { name:"Nom complet", numero:"Téléphone", email:"Email", address:"Adresse", profession:"Profession", marital_status:"Situation maritale", age_interval:"Tranche d'âge" }
    const missing = Object.keys(labels).find(k => !String(payload[k]||"").trim())
    if (missing) { setError(`Le champ « ${labels[missing]} » est requis.`); setLoading(false); return }
    try {
      const res    = await fetch("/api/auth/signup", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) })
      const result = await res.json()
      if (!res.ok) setError(result.message || "Impossible de créer le compte.")
      else { setMessage(result.message || "Compte créé avec succès !"); e.currentTarget.reset(); setMarital(""); setAge("") }
    } catch(error) { 
      console.log(error) }
    finally { setLoading(false) }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');

        /* ── reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-root {
          font-family: 'Instrument Sans', sans-serif;
          background: #F2EFE9;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ── animated grain overlay ── */
        .sp-grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .35;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* ── layout ── */
        .sp-layout {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 420px 1fr;
          min-height: 100vh;
        }

        /* ────────────────────────────
           LEFT – hero panel
        ──────────────────────────── */
        .sp-hero {
          background: #0A0A0A;
          padding: 3rem 2.5rem;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }

        /* big diagonal accent */
        .sp-hero::before {
          content: '';
          position: absolute; bottom: -120px; right: -120px;
          width: 420px; height: 420px;
          background: #1B6EF3;
          border-radius: 50%;
          opacity: .12;
        }
        .sp-hero::after {
          content: '';
          position: absolute; top: -60px; left: -60px;
          width: 220px; height: 220px;
          background: #FF4D2E;
          border-radius: 50%;
          opacity: .08;
        }

        /* logo pill */
        .sp-logo-pill {
          display: inline-flex; align-items: center; gap: .6rem;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px;
          padding: .35rem .9rem .35rem .5rem;
          width: fit-content;
          animation: fadeDown .5s ease both;
        }
        .sp-logo-pill-dot {
          width: 28px; height: 28px; border-radius: 50%;
          background: #1B6EF3;
          display: flex; align-items: center; justify-content: center;
        }
        .sp-logo-pill span {
          font-family: 'Syne', sans-serif;
          font-size: .8rem; font-weight: 600;
          letter-spacing: .06em; text-transform: uppercase;
          color: #fff;
        }

        /* hero headline */
        .sp-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 4.5vw, 4rem);
          font-weight: 800;
          line-height: .95;
          letter-spacing: -.02em;
          color: #fff;
          margin-top: 3rem;
          animation: fadeUp .6s .1s ease both;
        }
        .sp-hero-title .accent { color: #1B6EF3; }
        .sp-hero-title .accent-2 { color: #FF4D2E; }

        .sp-hero-sub {
          font-size: .9rem; color: #888; line-height: 1.65;
          margin-top: 1.25rem; max-width: 320px;
          animation: fadeUp .6s .2s ease both;
        }

        /* perks */
        .sp-perks {
          display: flex; flex-direction: column; gap: .75rem;
          margin-top: 3rem;
        }
        .sp-perk {
          display: flex; align-items: center; gap: 1rem;
          padding: .9rem 1rem;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          transition: background .2s, border-color .2s;
          animation: fadeUp .6s ease both;
        }
        .sp-perk:nth-child(1) { animation-delay: .3s }
        .sp-perk:nth-child(2) { animation-delay: .4s }
        .sp-perk:nth-child(3) { animation-delay: .5s }
        .sp-perk:hover { background: rgba(27,110,243,.08); border-color: rgba(27,110,243,.25); }
        .sp-perk-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: #1B6EF3;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sp-perk-icon svg { color: #fff; }
        .sp-perk-body p { font-size: .84rem; font-weight: 500; color: #eee; }
        .sp-perk-body span { font-size: .74rem; color: #666; }

        /* step counter */
        .sp-step-counter {
          display: flex; align-items: center; gap: .5rem;
          font-size: .72rem; letter-spacing: .12em;
          text-transform: uppercase; color: #555;
          animation: fadeUp .6s .6s ease both;
        }
        .sp-step-dot { width: 6px; height: 6px; border-radius: 50%; background: #1B6EF3; }

        /* ────────────────────────────
           RIGHT – form panel
        ──────────────────────────── */
        .sp-form-panel {
          padding: 3rem 3.5rem;
          display: flex; flex-direction: column; justify-content: center;
          background: #F2EFE9;
          position: relative;
        }

        /* big offset title behind form */
        .sp-ghost-title {
          font-family: 'Syne', sans-serif;
          font-size: 7rem; font-weight: 800;
          color: rgba(0,0,0,.04);
          line-height: 1;
          position: absolute; top: 1.5rem; right: 2rem;
          pointer-events: none; user-select: none;
          letter-spacing: -.04em;
        }

        .sp-form-eyebrow {
          display: flex; align-items: center; gap: .75rem;
          margin-bottom: 1.5rem;
          animation: fadeUp .5s ease both;
        }
        .sp-eyebrow-line { width: 28px; height: 2px; background: #1B6EF3; }
        .sp-eyebrow-text {
          font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
          color: #1B6EF3; font-weight: 600;
        }

        .sp-form-heading {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem; font-weight: 800;
          letter-spacing: -.03em; line-height: 1.1;
          color: #0A0A0A;
          margin-bottom: .5rem;
          animation: fadeUp .5s .05s ease both;
        }
        .sp-form-sub {
          font-size: .84rem; color: #777; margin-bottom: 2rem;
          animation: fadeUp .5s .1s ease both;
        }

        /* field row */
        .sp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .sp-row.full { grid-template-columns: 1fr; }

        .sp-field {
          display: flex; flex-direction: column; gap: .4rem;
          animation: fadeUp .5s ease both;
        }
        .sp-field:nth-child(1){ animation-delay:.12s }
        .sp-field:nth-child(2){ animation-delay:.16s }
        .sp-field:nth-child(3){ animation-delay:.20s }
        .sp-field:nth-child(4){ animation-delay:.24s }
        .sp-field:nth-child(5){ animation-delay:.28s }

        .sp-label {
          font-size: .7rem; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
          color: #555; display: flex; align-items: center; gap: .4rem;
        }
        .sp-label svg { color: #1B6EF3; }

        /* shadcn input overrides */
        .sp-form-panel input,
        .sp-form-panel [data-radix-select-trigger] {
          background: #fff !important;
          border: 1.5px solid #E0DDD7 !important;
          border-radius: 10px !important;
          color: #0A0A0A !important;
          font-family: 'Instrument Sans', sans-serif !important;
          font-size: .9rem !important;
          height: 46px !important;
          padding-left: 1rem !important;
          box-shadow: 2px 2px 0px rgba(0,0,0,.08) !important;
          transition: border-color .2s, box-shadow .2s !important;
        }
        .sp-form-panel input::placeholder { color: #bbb !important; }
        .sp-form-panel input:focus,
        .sp-form-panel [data-radix-select-trigger]:focus,
        .sp-form-panel [data-radix-select-trigger][data-state=open] {
          border-color: #1B6EF3 !important;
          box-shadow: 3px 3px 0px rgba(27,110,243,.25) !important;
          outline: none !important;
        }

        /* select content */
        .sp-select-content {
          background: #fff !important;
          border: 1.5px solid #E0DDD7 !important;
          border-radius: 12px !important;
          box-shadow: 4px 4px 0 rgba(0,0,0,.1) !important;
          overflow: hidden !important;
        }
        .sp-select-content [role=option] {
          font-family: 'Instrument Sans', sans-serif !important;
          font-size: .875rem !important;
          color: #0A0A0A !important;
          padding: .6rem 1rem !important;
          cursor: pointer !important;
        }
        .sp-select-content [role=option][data-highlighted] {
          background: #EBF1FE !important; color: #1B6EF3 !important;
        }
        .sp-select-content [role=option][data-state=checked] {
          color: #1B6EF3 !important; font-weight: 600 !important;
        }

        /* section sep */
        .sp-sep {
          display: flex; align-items: center; gap: .75rem;
          margin: 1.25rem 0 1rem;
        }
        .sp-sep span {
          font-size: .68rem; letter-spacing: .14em; text-transform: uppercase;
          color: #999; white-space: nowrap; font-weight: 600;
        }
        .sp-sep::before, .sp-sep::after {
          content: ''; flex: 1; height: 1px; background: #E0DDD7;
        }

        /* submit */
        .sp-submit {
          width: 100%; height: 52px !important;
          background: #0A0A0A !important; color: #fff !important;
          border-radius: 10px !important; border: none !important;
          font-family: 'Syne', sans-serif !important;
          font-size: .85rem !important; font-weight: 700 !important;
          letter-spacing: .06em !important; text-transform: uppercase !important;
          box-shadow: 4px 4px 0 #1B6EF3 !important;
          transition: transform .15s, box-shadow .15s !important;
          margin-top: 1.5rem !important;
          display: flex !important; align-items: center !important; justify-content: center !important; gap: .5rem !important;
        }
        .sp-submit:hover:not(:disabled) {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0 #1B6EF3 !important;
        }
        .sp-submit:active:not(:disabled) {
          transform: translate(2px,2px) !important;
          box-shadow: 2px 2px 0 #1B6EF3 !important;
        }
        .sp-submit:disabled { opacity: .6 !important; }

        /* login link */
        .sp-login-link {
          display: flex; align-items: center; justify-content: center; gap: .4rem;
          width: 100%; height: 46px;
          background: transparent !important; color: #555 !important;
          border: 1.5px solid #E0DDD7 !important; border-radius: 10px !important;
          font-family: 'Instrument Sans', sans-serif !important;
          font-size: .84rem !important;
          text-decoration: none;
          transition: border-color .2s, color .2s, box-shadow .2s;
          margin-top: .75rem;
        }
        .sp-login-link:hover {
          border-color: #0A0A0A !important; color: #0A0A0A !important;
          box-shadow: 2px 2px 0 #0A0A0A;
        }

        /* alert */
        .sp-alert-err {
          border-radius: 10px !important; border: 1.5px solid #FF4D2E !important;
          background: #FFF5F3 !important; margin-top: 1rem;
          box-shadow: 3px 3px 0 rgba(255,77,46,.2) !important;
        }
        .sp-alert-ok {
          border-radius: 10px !important; border: 1.5px solid #22C55E !important;
          background: #F0FDF4 !important; margin-top: 1rem;
          box-shadow: 3px 3px 0 rgba(34,197,94,.2) !important;
        }

        /* animations */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-12px) }
          to   { opacity:1; transform:translateY(0) }
        }

        /* responsive */
        @media (max-width: 820px) {
          .sp-layout { grid-template-columns: 1fr; }
          .sp-hero { min-height: 340px; padding: 2.5rem 2rem; }
          .sp-hero-title { font-size: 2.8rem; margin-top: 1.5rem; }
          .sp-form-panel { padding: 2.5rem 2rem; }
          .sp-ghost-title { display: none; }
          .sp-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="sp-root">
        <div className="sp-grain" aria-hidden="true" />

        <div className="sp-layout">
          {/* ── HERO LEFT ── */}
          <aside className="sp-hero">
            <div>
              {/* Logo pill */}
              <div className="sp-logo-pill">
                <div className="sp-logo-pill-dot">
                  <Shirt size={14} color="#fff" strokeWidth={2.5} />
                </div>
                <span>NDJIMO Press-Clean</span>
              </div>

              <h1 className="sp-hero-title">
                Le pressing<br />
                <span className="accent">qui prend</span><br />
                <span className="accent-2">soin</span> de vous.
              </h1>

              <p className="sp-hero-sub">
                Inscrivez-vous en 60 secondes et accédez à un service de pressing haut de gamme, livré à votre porte.
              </p>

              <div className="sp-perks">
                {perks.map(({ Icon, label, sub }) => (
                  <div className="sp-perk" key={label}>
                    <div className="sp-perk-icon">
                      <Icon size={17} strokeWidth={2.2} />
                    </div>
                    <div className="sp-perk-body">
                      <p>{label}</p>
                      <span>{sub}</span>
                    </div>
                    <ChevronRight size={14} color="#444" style={{ marginLeft:"auto", flexShrink:0 }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="sp-step-counter">
              <div className="sp-step-dot" />
              Étape 1 sur 1 · Inscription gratuite
            </div>
          </aside>

          {/* ── FORM RIGHT ── */}
          <section className="sp-form-panel">
            <div className="sp-ghost-title" aria-hidden="true">DJIMO</div>

            <div className="sp-form-eyebrow">
              <div className="sp-eyebrow-line" />
              <span className="sp-eyebrow-text">Nouveau compte</span>
            </div>
            <h2 className="sp-form-heading">Créer mon espace</h2>
            <p className="sp-form-sub">Tous les champs sont requis pour finaliser votre inscription.</p>

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>

              {/* Identité */}
              <div className="sp-row">
                {fields.slice(0, 2).map(({ name, label, type, placeholder, Icon }) => (
                  <div className="sp-field" key={name}>
                    <Label htmlFor={name} className="sp-label">
                      <Icon size={12} strokeWidth={2.5} />
                      {label}
                    </Label>
                    <Input id={name} name={name} type={type} placeholder={placeholder} />
                  </div>
                ))}
              </div>

              {/* Coordonnées sep */}
              <div className="sp-sep"><span>Coordonnées</span></div>

              {/* Email */}
              {[fields[2]].map(({ name, label, type, placeholder, Icon }) => (
                <div className="sp-field sp-row full" key={name}>
                  <Label htmlFor={name} className="sp-label">
                    <Icon size={12} strokeWidth={2.5} /> {label}
                  </Label>
                  <Input id={name} name={name} type={type} placeholder={placeholder} />
                </div>
              ))}

              {/* Address */}
              {[fields[3]].map(({ name, label, type, placeholder, Icon }) => (
                <div className="sp-field sp-row full" key={name}>
                  <Label htmlFor={name} className="sp-label">
                    <Icon size={12} strokeWidth={2.5} /> {label}
                  </Label>
                  <Input id={name} name={name} type={type} placeholder={placeholder} />
                </div>
              ))}

              {/* Profession + Marital */}
              <div className="sp-row">
                {[fields[4]].map(({ name, label, type, placeholder, Icon }) => (
                  <div className="sp-field sp-row full" key={name}>
                    <Label htmlFor={name} className="sp-label">
                      <Icon size={12} strokeWidth={2.5} /> {label}
                    </Label>
                    <Input id={name} name={name} type={type} placeholder={placeholder} />
                  </div>
                ))}
                
              </div>

              {/* Profil sep */}
              <div className="sp-sep"><span>Profil</span></div>

              <div className="sp-field">
                  <Label className="sp-label">
                    <Heart size={12} strokeWidth={2.5} /> Situation maritale
                  </Label>
                  <Select value={marital} onValueChange={setMarital}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir…" />
                    </SelectTrigger>
                    <SelectContent className="sp-select-content">
                      {maritalOptions.map(o => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              {/* Age */}
              <div className="sp-field">
                <Label className="sp-label">
                  <Calendar size={12} strokeWidth={2.5} /> Tranche d'âge
                </Label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner votre tranche…" />
                  </SelectTrigger>
                  <SelectContent className="sp-select-content">
                    {ageOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Alerts */}
              {error && (
                <Alert className="sp-alert-err">
                  <AlertCircle size={15} color="#FF4D2E" style={{ flexShrink:0 }} />
                  <AlertDescription style={{ color:"#CC2200", fontSize:".82rem" }}>{error}</AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert className="sp-alert-ok">
                  <CheckCircle2 size={15} color="#22C55E" style={{ flexShrink:0 }} />
                  <AlertDescription style={{ color:"#166534", fontSize:".82rem" }}>{message}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button type="submit" className="sp-submit" disabled={loading}>
                {loading
                  ? <><Sparkles size={16} /> Création en cours…</>
                  : <><span>Créer mon compte</span><ArrowRight size={16} /></>
                }
              </Button>

              <Link href="/auth/login" className="sp-login-link">
                Déjà inscrit ? <strong>Se connecter</strong>
                <ChevronRight size={14} />
              </Link>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}