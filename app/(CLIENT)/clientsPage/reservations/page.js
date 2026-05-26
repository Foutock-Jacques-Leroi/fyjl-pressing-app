"use client"

import Link from "next/link";
import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const sampleReservations = [
  { id: "R-1001", service: "Relaxing Massage", date: "June 5, 2026", time: "2:30 PM", status: "Confirmed", staff: "Laura" },
  { id: "R-1002", service: "Skin Consultation", date: "June 12, 2026", time: "11:00 AM", status: "Pending", staff: "Nina" },
  { id: "R-1003", service: "Wellness Check", date: "July 2, 2026", time: "4:00 PM", status: "Confirmed", staff: "Marco" },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(sampleReservations);

  function handleCancel(id) {
    setReservations((current) => current.filter((reservation) => reservation.id !== id));
  }

  return (
    <div className="min-h-screen font-serif bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">My reservations</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Your schedule at a glance.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Review upcoming appointments, confirm details, or update your bookings instantly.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className={"font-black border-3"} asChild>
                  <Link className="px-5 py-6 font-bold" href="/clientsPage/services">Book a new service</Link>
                </Button>
                <Button className={"font-extrabold border-3"} variant="outline" asChild>
                  <Link className="px-5 py-6" href="/clientsPage/clients">Account settings</Link>
                </Button>
              </div>
            </div>
          </section>

          <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
            <CardHeader className="px-6 py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Reservation overview</CardTitle>
                  <CardDescription>Recent bookings and status updates for your active appointments.</CardDescription>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-sm">{reservations.length} active bookings</Badge>
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-10 sm:px-8">
              <Table className="min-w-full ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow className="font-serif" key={reservation.id}>
                      <TableCell className="font-bold p-4 font-serif text-slate-900">{reservation.service}</TableCell>
                      <TableCell className="font-serif">{reservation.date}</TableCell>
                      <TableCell className="font-serif">{reservation.time}</TableCell>
                      <TableCell>
                        <Badge className={"font-black p-4 text-sm"} variant={reservation.status === "Confirmed" ? "secondary" : reservation.status === "Pending" ? "outline" : "destructive"}>
                          {reservation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{reservation.staff}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Details</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>Reservation {reservation.id}</DialogTitle>
                              <DialogDescription>
                                <p className="mb-3 text-sm text-slate-700">Service: {reservation.service}</p>
                                <p className="mb-3 text-sm text-slate-700">Date: {reservation.date}</p>
                                <p className="mb-3 text-sm text-slate-700">Time: {reservation.time}</p>
                                <p className="mb-3 text-sm text-slate-700">Staff: {reservation.staff}</p>
                                <p className="text-sm text-slate-500">Use the cancel button below to remove this reservation from your schedule.</p>
                              </DialogDescription>
                              <DialogFooter>
                                <Button variant="">Close</Button>
                                <Button variant="destructive" onClick={() => handleCancel(reservation.id)}>Cancel Booking</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handleCancel(reservation.id)}>Cancel</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <CardFooter className="px-6 py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">Need help changing your reservation? Contact support or update it through your profile page.</p>
                <Button asChild>
                  <Link href="/clientsPage/services">Book another service</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>

          {reservations.length === 0 && (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-sm">
              No reservations yet — start by booking a service in the services section.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
