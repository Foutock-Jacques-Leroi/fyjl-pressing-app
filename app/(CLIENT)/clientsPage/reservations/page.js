"use client"

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {useRouter} from "next/navigation";


export default function ReservationsPage() {
  const router = useRouter()

  
  
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

// console.log(reserveItems, me)

// useEffect(() => {
  
//   async function LoadReservations() {

//     const sessionUser = await getSessionUser()

//     if (!sessionUser){
//       setError("User not authenticated.")
//       setLoading(false)
//       return
//     }

//     console.log(sessionUser)
//     setMe(sessionUser)
//   }

//   LoadReservations()
// }, [])



  async function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.append("c_id", client.c_id)  

    const res = await fetch('/clientsPage/reservations/api', {
        method: "POST",
        body: fd
    })

    if (!res.ok) {
      toast.error("Failed to create reservation.")
    }

    const data = await res.json()
    console.log(data)
    toast("Success !", {
      description: "Your reservation has been saved. Now finalise it by booking a service.",
    })
    router.push(`/clientsPage/reservationItems?trs_id=${data.trs_id}`)    // toast.success("Réservation créée avec succès !")
  
  // console.log(client)
  }

  return (
    <div className="min-h-screen font-serif bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">Réservations</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Créer et consulter vos lignes de réservation</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Ajoutez un article de réservation {client?.name} pour un service existant et suivez les données enregistrées.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="p-6 font-black border-4" asChild>
                  <Link href="/clientsPage/services">Voir les services</Link>
                </Button>
                <Button variant="outline" className="p-6 font-black border-4" asChild>
                  <Link href="/clientsPage/clients">Profil client</Link>
                </Button>
              </div>
            </div>
          </section>


        <div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <input type="date" name="date" className="mb-4 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />  
          <input type="text" name="notes" placeholder="Search..." className="mb-4 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />  
        
        <button className="mb-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit">
          Submit
        </button>
        </form>
        </div>

       

          {/* <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
            <CardHeader className="px-6 py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Liste des articles de réservation</CardTitle>
                  <CardDescription>Affiche tous les `reservation_items` enregistrés dans la base.</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-10 sm:px-8">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Reservation ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                        Chargement des données...
                      </TableCell>
                    </TableRow>
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                        Aucun article de réservation trouvé.
                      </TableCell>
                    </TableRow>
                  ) : (
                    reserveItems.map((item) => (
                      <TableRow key={item.item_id}>
                        <TableCell>{item.item_id}</TableCell>
                        <TableCell>{item.trs_id}</TableCell>
                        <TableCell>{services.find((service) => service.srv_id === item.srv_id)?.name ?? item.srv_id}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit_price}</TableCell>
                        <TableCell>{item.sub_total}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}
