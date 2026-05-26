"use client"

import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  { id: "S-1", title: "Premium Care", description: "A full-service wellness session designed to relax and recharge your body.", badge: "Best seller", price: "From 1500 XAF" },
  { id: "S-2", title: "Focus Session", description: "Targeted treatments to sharpen comfort and target your priority areas.", badge: "Personalized", price: "2000 XAF" },
  { id: "S-3", title: "Self-Care Boost", description: "A quick refresh package that keeps your routine effortless and effective.", badge: "Fast service", price: "750 XAF" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-serif">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-700">Service collection</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Choose the perfect experience.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Discover curated wellness options with transparent pricing and a smooth booking flow.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className={"p-6 font-black border-4"} asChild>
                  <Link  href="/clientsPage/reservations">View Reservations</Link>
                </Button>
                <Button variant="outline" className={"p-6 font-black border-4"} asChild>
                  <Link href="/clientsPage/clients">Profile Settings</Link>
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-lg shadow-slate-200/20">
                <CardHeader className="space-y-4 px-6 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className={"font-bold text-2xl font-mono"}>{service.title}</CardTitle>
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-sm">{service.badge}</Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-2">
                  <div className="rounded-3xl bg-slate-50 p-5 text-slate-700">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Starting at</p>
                    <p className="mt-3 text-2xl font-semibold font-mono">{service.price}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end px-6 pb-6 pt-2">
                  <Button>Book now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Need help choosing?</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">We’ll recommend the best service based on your goals and booking history. Perfect for quick refreshes or deep wellness rituals.</p>
              </div>
              <div className="flex items-center justify-end">
                <Button asChild>
                  <Link href="/clientsPage/clients">Get personalized help</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
