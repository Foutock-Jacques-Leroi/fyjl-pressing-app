import supabase from "@/lib/supadb";
import { NextResponse } from "next/server";
import { getSession, getSessionUser } from "@/lib/sessions";


export async function GET(request){

    try{
    const sessionUser = await getSessionUser()

    console.log(await getSession())
    if(!sessionUser){
        return NextResponse.json({message:"NOT AUTHENTICATED"})
    }

    const {data: client , error} = await supabase
    .from("clients")
    .select("*")
    .eq("c_id", sessionUser.c_id)
    .single()

    if (!client  || error){
        return NextResponse.json({message:error.message}, {status: 404})
    }

    return NextResponse.json({client})
    }catch(error){
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}