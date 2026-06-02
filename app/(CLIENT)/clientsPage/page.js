"use client"
import Link from "next/link";
import { useEffect, useState } from "react";


export default function clientSide() {

    const [client, setClient] = useState("")

    useEffect(()=>{
        async function UserSession(){
            try{
            const res = await fetch("/api/auth/me")

            if (res.ok){
            const data = await res.json()
            setClient(data.client)
            // console.log(data.user)
            }
        }catch(error){
            return "Erro in request"
        }
        }
        UserSession()
    }, [])


  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.32em] text-indigo-700">
              WELCOME {client?.name}
            </p>
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Your client hub is ready.</h1>
              <p className="max-w-3xl text-sm leading-6 text-slate-600">Go straight to your reservations, browse services, or update your profile settings with modern cards and a clean experience.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link href="/clientsPage/reservations" className="group rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Reservations</p>
                  <h2 className="mt-4 text-3xl font-semibold">Check bookings</h2>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/20 text-indigo-100">📅</span>
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-300">Manage upcoming appointments and keep your schedule under control.</p>
            </Link>

            <Link href="/clientsPage/services" className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Services</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">Book a service</h2>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">✨</span>
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-600">Browse curated options to find the perfect treatment for your next visit.</p>
            </Link>

            <Link href="/clientsPage/clients" className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Settings</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">Update profile</h2>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">⚙️</span>
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-600">Change your contact info, security settings, and booking preferences.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
