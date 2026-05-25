import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";


export async function GET(request, {params}){

    const {adminclientId} = await params
    console.log(adminclientId)

    if(!adminclientId){
        return NextResponse.json({message:"No client_id found"})
    }

    const {data: adminclient, error: Error} = await supabase
    .from("clients")
    .select("*")
    .eq("c_id", adminclientId)
    .single()

    if (Error){
        return NextResponse.json({message:"Client not found"},{status:404})
    }

    return NextResponse.json({message:"Client Found !", adminclient}, {status:200})
    
}


// export async function DELETE(request, {params}){

//     const {adminclientId} = await params

//     if (!adminclientId){
//         return NextResponse.json({message:"Id required!"})
//     }

//     const {data: existing} = await supabase
//     .from("clients")
//     .select("c_id")
//     .eq("c_id", adminclientId)
//     .single()

//     if (!existing){
//         return NextResponse.json({message:"not found"},{status:404})
//     }

//     const {data: client, error: Error} = await supabase
//     .from("clients")
//     .delete()
//     .eq("c_id", adminclientId)

//     if(Error){
//         return NextResponse.json({message:Error.message}, {status:500})
//     }
//     return NextResponse.json({message:"deletion successfull", client})
// }

// export async function PATCH(request, {params}){
//     const {adminclientId} = await params
//     const { name, numero, address, email, profession, marital_status, age_interval } = await request.json();

//     const {data: existing} = await supabase
//     .from("clients")
//     .select("c_id")
//     .eq("c_id", adminclientId)
//     .single()

//     if(!existing){
//         return NextResponse.json({message:"Id required"}, {status:404})
//     }

//     const updates = {
//     ...(name           && { name }),
//     ...(numero         && { numero }),
//     ...(address        && { address }),
//     ...(email          && { email }),
//     ...(profession     && { profession }),
//     ...(marital_status && { marital_status }),
//     ...(age_interval   && { age_interval }),
//     updated_at: new Date().toISOString(),
//   };

//     const {data:client, error:Error} = await supabase
//     .from("clients")
//     .update(updates)
//     .eq("c_id", adminclientId)
//     .select("*")
//     .single()

//     if (Error) {
//         return NextResponse.json({message:Error.message}, {status:500})
//     }

//     return NextResponse.json({message: "Client freshly update", client}, {status:200})
// }