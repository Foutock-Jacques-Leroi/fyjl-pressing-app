import supabase from "@/lib/supadb";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import next from "next";
import {randomUUID} from "crypto"

export async function POST(request) {
 
  // ── 1. Read the request body ──────────────────────────────
//   const body = await request.json();
  const { name, numero, address, email, profession, marital_status, age_interval } = await request.json();
 
  // ── 2. Validate required fields ───────────────────────────
  if (!name || !numero) {
    return NextResponse.json(
      { error: "name and numero are required" },
      { status: 400 }
    );
  }
 
  // ── 3. Check if numero already exists ─────────────────────
  const { data: existing } = await supabase
    .from("clients")
    .select("c_id")
    .eq("numero", numero)
    .single();
 
  if (existing) {
    return NextResponse.json(
      { error: "This phone number is already registered" },
      { status: 409 }
    );
  }
 
  // ── 4. Insert the new client ──────────────────────────────
  const { data, error } = await supabase
    .from("clients")
    .insert({
      c_id:   randomUUID(),
      name,
      numero,
      address:        address        ?? null,
      email:          email          ?? null,
      profession:     profession     ?? null,
      marital_status: marital_status ?? null,
      age_interval:   age_interval   ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select(`
      c_id,
      name,
      numero,
      address,
      email,
      profession,
      marital_status,
      age_interval,
      created_at
    `)
    .single();
 
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
 
  return NextResponse.json(
    { message: "Client created successfully", client: data },
    { status: 201 }
  );
}


export async function GET(request){


    const {data: client, error: Error} = await supabase
    .from("clients")
    .select("*")

    if (Error){
        return NextResponse.json({
            message:"error inside the syntax"
        })
    }



    return NextResponse.json({message:"All Clients fetched", client}, {status: 200})
}
