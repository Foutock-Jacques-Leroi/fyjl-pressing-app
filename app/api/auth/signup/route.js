import { NextResponse } from "next/server";
import {getSession} from "@/lib/sessions"
import supabase from "@/lib/supadb";
import {randomUUID} from "crypto"


export async function POST(request){

    try{

    const {name,numero,address,marital_status,age_interval,email,profession } = await request.json()

    // if (!name?.trim() || !numero?.trim() || !address?.trim() || !marital_status?.trim() || !age_interval?.trim() || !email?.trim() || !profession?.trim() ){
    //     return NextResponse.json({message:"informations absent!"})
    // }

    if (!name?.trim()){
       return NextResponse.json({message:"informations absent!"})

    }

    const {data: client, error} = await supabase
    .from("clients")
    .insert({
        c_id: randomUUID(),
        name: name,
        numero: numero,
        email: email,
        address: address,
        marital_status: marital_status,
        age_interval: age_interval,
        profession: profession,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    })
    .select( 
     `c_id,
      name,
      numero,
      address,
      email,
      profession,
      marital_status,
      age_interval,
      created_at
    `)
    .maybeSingle()
    
    if (error){
        return NextResponse.json({message:"not found", mes: error.message})
    }

   const session = await getSession()
   session.client = {
    c_id: client.c_id,
    name: client.name,
    email: client.email,
    profession: client.profession,
    numero: client.numero,
    marital_status: client.marital_status,
    age_interval: client.age_interval,
   }

   await session.save()

   return NextResponse.json({message:"Connexion reussi", client}, {status: 201})

}catch(error){
     console.error("[SIGNUP ERROR]", error);
     return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
     )
}
}

