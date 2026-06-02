import supabase from "@/lib/supadb";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import next from "next";
import {randomUUID} from "crypto"

export async function POST(request) {
 
  // ── 1. Read the request body ──────────────────────────────
//   const body = await request.json();
  const { name, description, price } = await request.json();
 
  // ── 2. Validate required fields ───────────────────────────
  if (!name) {
    return NextResponse.json(
      { error: "name is required" },
      { status: 400 }
    );
  }
 
  // ── 3. Check if numero already exists ─────────────────────
  const { data: existing } = await supabase
    .from("services")
    .select("srv_id")
    .eq("name", name)
    .single();
 
  if (existing) {
    return NextResponse.json(
      { error: "This service is already registered" },
      { status: 409 }
    );
  }
 
  // ── 4. Insert the new client ──────────────────────────────
  const { data, error } = await supabase
    .from("services")
    .insert({
      srv_id:   randomUUID(),
      name,
      description: description ?? null,
      price:   price   ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select("*")
    .single();
 
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
 
  return NextResponse.json(
    { message: "service created successfully", client: data },
    { status: 201 }
  );
}


export async function GET(request){


    const {data: services, error: Error} = await supabase
    .from("services")
    .select("*")

    if (Error){
        return NextResponse.json({ message:Error.message })
    }



    return NextResponse.json({services}, {status: 200})
}
