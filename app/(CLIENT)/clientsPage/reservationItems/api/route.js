import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";
import { randomUUID } from "crypto"


export async function POST(request) {

    try{

        const formData = await request.formData()

        const srv_id = formData.get("srv_id")
        const trs_id = formData.get("trs_id")
        const unit_price = formData.get("price")
        const sub_total = formData.get("total_price")
        const quantity = formData.get("quantity")


        console.log("srv_id:::", srv_id)
        console.log("trs_id:::", trs_id)
        console.log("price:::", unit_price)
        console.log("total_price:::", sub_total)
        console.log("quantity:::", quantity)


        if (!srv_id || !trs_id){
            return NextResponse.json({error: "service_id and trs_id are required"}, {status:400})
        }

        const {data: reservationItem, error} = await supabase
        .from("reservation_items")
        .insert([
            {
                item_id: randomUUID(),
                unit_price: unit_price,
                sub_total: sub_total,
                quantity: quantity,
                srv_id: srv_id,
                trs_id: trs_id
            }
        ])
        .select()
        .single()

        if (error){
            return NextResponse.json({error: error.message}, {status:500})
        }

            return NextResponse.json({reservationItem}, {status:201})




    }catch(error){
        return NextResponse.json({error: error.message}, {status:500})  
    }

}




export async function GET(request) {
  const { data: reservations, error } = await supabase
    .from("reservation_items")
    .select("*")
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ reservations }, { status: 200 });
}

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const srv_id = formData.get("service_id");
//     const trs_id = formData.get("trs_id");
//     const id = randomUUID();

//     const { data, error } = await supabase
//       .from("reservation_items")
//       .insert([
//         {
//           id,
//           srv_id,
//           trs_id
//         }
//       ]);
//     if (error) {
//       return NextResponse.json({ error }, { status: 500 });
//     }
//     return NextResponse.json({ data });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   } 
// }