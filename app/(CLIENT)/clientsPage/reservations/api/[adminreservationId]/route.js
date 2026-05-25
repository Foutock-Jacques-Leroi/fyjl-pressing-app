import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";


export async function GET(request, {params}){

    const {adminreservationId} = await params

    if(!adminreservationId){
        return NextResponse.json({message:"No reservation_Id found"})
    }

    const {data: adminreservation, error: Error} = await supabase
    .from("reservations")
    .select("*")
    .eq("trs_id", adminreservationId)
    .single()

    if (Error){
        return NextResponse.json({message:"reservation not found"},{status:404})
    }

    return NextResponse.json({message:"Reservation Found !", adminreservation}, {status:200})
    
}


// export async function DELETE(request, {params}){

//     const {adminreservationId} = await params

//     if (!adminreservationId){
//         return NextResponse.json({message:"Id required!"})
//     }

//     const {data: existing} = await supabase
//     .from("reservations")
//     .select("trs_id")
//     .eq("trs_id", adminreservationId)
//     .single()

//     if (!existing){
//         return NextResponse.json({message:"Reservation not found"},{status:404})
//     }

//     const {data: reservation, error: Error} = await supabase
//     .from("reservations")
//     .delete()
//     .eq("trs_id", adminreservationId)

//     if(Error){
//         return NextResponse.json({message:Error.message}, {status:500})
//     }
//     return NextResponse.json({message:"deletion successfull", reservation})
// }

// export async function PATCH(request, {params}){
//     const {adminreservationId} = await params
//     // const { name, numero, address, email, profession, marital_status, age_interval } = await request.json();
//   const { status, notes, date, total_price, c_id} = await request.json();


//     const {data: existing} = await supabase
//     .from("reservations")
//     .select("trs_id")
//     .eq("trs_id", adminreservationId)
//     .single()

//     if(!existing){
//         return NextResponse.json({message:"Id required"}, {status:404})
//     }

//     const updates = {

//     ...(status          && { status }),
//     ...(notes           && { notes }),
//           date:         new Date().toISOString(),
//     ...(total_price     && { total_price }),
//     ...(c_id            && { c_id }),
//     created_at:        new Date().toISOString(),
//     updated_at:        new Date().toISOString(),
//   };

//     const {data:client, error:Error} = await supabase
//     .from("reservations")
//     .update(updates)
//     .eq("trs_id", adminreservationId)
//     .select("*")


//     if (Error) {
//         return NextResponse.json({message:Error.message}, {status:500})
//     }

//     return NextResponse.json({message: "reservation freshly update", client}, {status:200})
// }