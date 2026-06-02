import { getSession } from "@/lib/sessions";
import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";


export async function POST(request){

    try{
    const {name, numero} = await request.json()


    if(!name?.trim() || !numero?.trim()){
        return NextResponse.json({message:"number and name absent"}, {status:404})
    }

    const {data: client, error: Error} = await supabase
    .from("clients")
    .select("c_id, name, email, profession, numero, marital_status, age_interval")
    .eq("numero", numero)
    .maybeSingle()

    if (Error){
        return NextResponse.json({message:Error.message})
    }
    if (!client){
        return NextResponse.json({message:"No users found"}, {status:404})
    }

    const sessions = await getSession()
    sessions.client = {
    c_id: client.c_id,
    name: client.name,
    email: client.email,
    profession: client.profession,
    numero: client.numero,
    marital_status: client.marital_status,
    age_interval: client.age_interval,
   }
   await sessions.save()

   return NextResponse.json({
    message: "Connexion etablit!",
    client: sessions.client
   }, {status:201})



    }catch(error){
        return NextResponse.json({message: error})
    }


}