import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";


export async function GET(request, {params}){

    const {adminserviceId} = await params

    if(!adminserviceId){
        return NextResponse.json({message:"No client_id found"})
    }

    const {data: adminservice, error: Error} = await supabase
    .from("services")
    .select("*")
    .eq("srv_id", adminserviceId)
    .single()

    if (Error){
        return NextResponse.json({message:"Service not found"},{status:404})
    }

    return NextResponse.json({message:"Service Found !", adminservice}, {status:200})
    
}


export async function DELETE(request, {params}){

    const {adminserviceId} = await params

    if (!adminserviceId){
        return NextResponse.json({message:"service_Id required!"})
    }

    const {data: existing} = await supabase
    .from("services")
    .select("srv_id")
    .eq("srv_id", adminserviceId)
    .single()

    if (!existing){
        return NextResponse.json({message:"not found"},{status:404})
    }

    const {data: service, error: Error} = await supabase
    .from("services")
    .delete()
    .eq("srv_id", adminserviceId)

    if(Error){
        return NextResponse.json({message:Error.message}, {status:500})
    }
    return NextResponse.json({message:"deletion successfull", service})
}

export async function PATCH(request, {params}){
    const {adminserviceId} = await params
    const { name, description, price } = await request.json();

    const {data: existing} = await supabase
    .from("services")
    .select("srv_id")
    .eq("srv_id", adminserviceId)
    .single()

    if(!existing){
        return NextResponse.json({message:"Id required"}, {status:404})
    }

    const updates = {
    ...(name     && { name }),
    ...(description && { description }),
    ...(price   && { price }),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

    const {data:service, error:Error} = await supabase
    .from("services")
    .update(updates)
    .eq("srv_id", adminserviceId)
    .select("*")
    .single()

    if (Error) {
        return NextResponse.json({message:Error.message}, {status:500})
    }

    return NextResponse.json({message: "service freshly update", service}, {status:200})
}