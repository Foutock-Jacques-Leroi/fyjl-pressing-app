"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)
const CalendarIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const NotesIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const ServiceIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
const EmptyIcon = () => (
  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

// ── Currency formatter ────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

// ── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <TableRow>
      {[1,2,3,4,5].map(i => (
        <TableCell key={i}>
          <div className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: `${[60,80,40,55,50][i-1]}%` }} />
        </TableCell>
      ))}
    </TableRow>
  )
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ label, value, color }) {
  const colors = {
    indigo:  "bg-indigo-50  text-indigo-700  border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber:   "bg-amber-50   text-amber-700   border-amber-100",
  }
  return (
    <div className={`flex flex-col items-center px-5 py-3 rounded-xl border ${colors[color]}`}>
      <span className="text-xl font-bold tabular-nums">{value}</span>
      <span className="text-xs font-medium mt-0.5 opacity-70">{label}</span>
    </div>
  )
}

export default function ReservationsPage() {
  const router = useRouter()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [client, setClient] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    async function UserSession() {
      try {
        const [res, itemres, servRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/clientsPage/reservationItems/api"),
          fetch("/clientsPage/services/api"),
        ])
        if (res.ok && itemres.ok && servRes.ok) {
          const data     = await res.json()
          const itemData = await itemres.json()
          const srvData  = await servRes.json()
          setClient(data.client)
          setItems(itemData.reservations)
          setServices(srvData.services)
        }
      } catch (error) {
        console.error("Error in request:", error)
      } finally {
        setLoading(false)
      }
    }
    UserSession()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    fd.append("c_id", client?.c_id)

    try {
      const res = await fetch('/clientsPage/reservations/api', { method: "POST", body: fd })
      if (!res.ok) { toast.error("Failed to create reservation."); return }
      const data = await res.json()
      toast("Réservation créée !", { description: "Finalisez en choisissant un service." })
      router.push(`/clientsPage/reservationItems?trs_id=${data.reservation.trs_id}`)
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  // Derived stats
  const totalRevenue = items.reduce((s, i) => s + parseFloat(i.sub_total ?? 0), 0)
  const uniqueRes    = new Set(items.map(i => i.trs_id)).size

  return (
    <div className="min-h-screen bg-slate-50/70">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">

        {/* ── Hero header ── */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-6">
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">Réservations</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {client?.name ? `Bonjour, ${client.name}` : "Tableau de bord"}
            </h1>
            <p className="text-indigo-200 text-sm mt-1">Gérez vos réservations et articles de service</p>
          </div>

          {/* Stats + actions row */}
          <div className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3 flex-wrap">
              <StatPill label="Réservations" value={uniqueRes}          color="indigo"  />
              <StatPill label="Articles"     value={items.length}       color="amber"   />
              <StatPill label="Total"        value={`${(totalRevenue).toFixed(2)} XAF`}  color="emerald" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs font-semibold border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors" asChild>
                <Link href="/clientsPage/services"><ServiceIcon />&nbsp;Services</Link>
              </Button>
              <Button variant="outline" size="sm" className="text-xs font-semibold border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors" asChild>
                <Link href="/clientsPage/clients">Mon profil</Link>
              </Button>
              <Button
                size="sm"
                className="text-xs font-semibold bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white transition-colors"
                onClick={() => setFormOpen(v => !v)}
              >
                <PlusIcon />&nbsp;Nouvelle réservation
              </Button>
            </div>
          </div>
        </div>

        {/* ── Collapsible form ── */}
        <div className={`overflow-hidden transition-all duration-300 ${formOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-8 py-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Créer une nouvelle réservation</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><CalendarIcon /></span>
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><NotesIcon /></span>
                  <input
                    type="text"
                    name="notes"
                    required
                    placeholder="Notes ou commentaires…"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-5 py-2 text-sm font-semibold text-white transition-colors"
                >
                  {submitting ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : <PlusIcon />}
                  {submitting ? "En cours…" : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Table card ── */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardHeader className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-800">Articles de réservation</CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-0.5">
                  {loading ? "Chargement…" : `${items.length} article${items.length !== 1 ? "s" : ""} enregistré${items.length !== 1 ? "s" : ""}`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-6">Item ID</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">Qté</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">Prix unit.</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right pr-6">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <>{[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}</>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex flex-col items-center justify-center py-14 text-center gap-2">
                        <EmptyIcon />
                        <p className="text-sm font-medium text-slate-500">Aucune réservation trouvée</p>
                        <p className="text-xs text-slate-400">Cliquez sur « Nouvelle réservation » pour commencer.</p>
                        <button
                          onClick={() => setFormOpen(true)}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <PlusIcon /> Créer une réservation
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow
                      key={item.item_id}
                      className="group hover:bg-indigo-50/30 transition-colors cursor-pointer text-3xl"
                      // onClick={() => router.push(`/clientsPage/reservationItems?trs_id=${item.trs_id}`)}
                    >
                      <TableCell className="pl-6">
                        <span className="font-mono text-xs text-slate-400 group-hover:text-indigo-500 transition-colors">
                          {item.item_id?.slice(0, 14)}…
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold text-slate-700">
                          {services.find(s => s.srv_id === item.srv_id)?.name ?? (
                            <span className="font-mono text-xs text-slate-400">{item.srv_id}</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center font-mono justify-center w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 text-xs font-bold transition-colors">
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-500">
                        {(item.unit_price)}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-mono text-sm font-semibold text-emerald-400">{(item.sub_total)} XAF</span>
                          <ChevronRight />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Footer total */}
            {!loading && items.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <span className="text-xs text-slate-400">{items.length} article{items.length !== 1 ? "s" : ""}</span>
                <div className="text-right">
                  <span className="text-xs text-slate-400 mr-2">Total</span>
                  <span className="text-base font-bold font-mono text-emerald-600">{(totalRevenue)} XAF</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  )
}