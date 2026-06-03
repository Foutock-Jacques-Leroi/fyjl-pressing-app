"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";



function ReservationItemsContent() {
  const searchParams = useSearchParams()
  const trs_id = searchParams.get("trs_id")
  const router = useRouter()

  const [reserveItems, setReserveItems] = useState("")
  const [client, setClient] = useState("")
  const [services, setServices] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    async function SessionUser() {
      try {
        const res = await fetch("/api/auth/me")
        const srvRes = await fetch("/clientsPage/services/api")
        const itemres = await fetch("/clientsPage/reservations/api")
        if (res.ok && srvRes.ok && itemres.ok) {
          const data = await res.json()
          setClient(data.client)
          const srvData = await srvRes.json()
          setServices(srvData.services)
          const itemData = await itemres.json()
          setReserveItems(itemData.reservations)
        }
      } catch (error) {
        return "Error in request"
      }
    }
    SessionUser()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.append("trs_id", trs_id)       // ✅ attach trs_id from URL
    fd.append("srv_id", selectedService?.srv_id)   // ✅ attach service id
    const data = Object.fromEntries(fd)

    const res = fetch("/clientsPage/reservationItems/api", {
      method: "POST",
      body: fd
    })

    if (!res) {
        console.log("Failed to create reservation item")
    // const items = data.reservationItems || []
    }
    toast("Success !", {
      description: "Your reservation has been saved Sucessfully",
    })
    router.push(`/clientsPage/reservations`)    // toast.success("Réservation créée avec succès !")
    }

  

  return (
    <div className="flex flex-col gap-4">
     
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="serviceId"
          value={selectedService?.srv_id ?? ""}
          onChange={(e) => {
            const found = services.find(s => s.srv_id === e.target.value)
            setSelectedService(found)
          }}
        >
          <option value="" disabled>— Select a service —</option>
          {services.map((service) => (
            <option key={service.srv_id} value={service.srv_id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 rounded"
          value={selectedService ? parseFloat(selectedService.price) || "" : ""}
          readOnly
        />
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          className="border p-2 rounded"
          value={selectedService ? parseFloat(selectedService.price) * quantity || "" : ""}
          readOnly
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" type="submit">
          Finalise Reservation
        </button>
      </form>
    </div>
  )
}

export default function ReservationItemsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
      <ReservationItemsContent />
    </Suspense>
  )
}