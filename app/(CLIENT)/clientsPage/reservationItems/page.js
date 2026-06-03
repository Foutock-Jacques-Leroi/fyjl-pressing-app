"use client"

import { useState,useEffect } from "react"
import { useSearchParams } from "next/navigation"
export default function ReservationItemsPage() {


const searchParams = useSearchParams()
  const trs_id = searchParams.get("trs_id")
  
    console.log("trs_id:::", trs_id)

    const [reserveItems, setReserveItems] = useState("")
    const [client, setClient] = useState("")
    const [services, setServices] = useState([])
    const [serviceId, setServiceId] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [selectedService, setSelectedService] = useState([])

    useEffect(()=>{
        async function SessionUser(){

            try{
            const res = await fetch("/api/auth/me")
            const srvRes = await fetch("/clientsPage/services/api")
            const itemres = await fetch("/clientsPage/reservations/api")


            if (res.ok && srvRes.ok && itemres.ok){

            const data = await res.json()
            setClient(data.client)

            const srvData = await srvRes.json()
            setServices(srvData.services)

            const itemData = await itemres.json()
            setReserveItems(itemData.reservations)
            }
            // console.log(client) 
        }catch(error){  
            return "Error in request"

        }
    }

        SessionUser()
    },[])

   
    function handleSubmit(e) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const data = Object.fromEntries(fd)

        console.log(data)
    }

return(
    <>
   
    <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Reservation Items</h1>
        
        
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
        <input type="number" name="quantity" placeholder="Quantity" className="border p-2 rounded" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            Finalise Reservation
        </button>
        </form>
            {console.log(selectedService)}

    </div>
    </>
)

}