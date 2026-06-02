import supabase from "@/lib/supadb";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import next from "next";
import {randomUUID} from "crypto"

export async function POST(request) {
 
  // ── 1. Read the request body ──────────────────────────────
//   const body = await request.json();
  const { status, notes, total_price, c_id} = await request.json();
 
  // ── 2. Validate required fields ───────────────────────────
  if (!c_id) {
    return NextResponse.json(
      { error: "client id absent" },
      { status: 400 }
    );
  }
 
//   // ── 3. Check if numero already exists ─────────────────────
//   const { data: existing, error:Error } = await supabase
//     .from("reservations")
//     .select("trs_id")
//     .eq("c_id", c_id)
//     .maybeSingle();
 
//   if (Error) {
//     return NextResponse.json(
//       { error: Error.message },
//       { status: 409 }
//     );
//   }
 
  // ── 4. Insert the new client ──────────────────────────────
  const { data, error } = await supabase
    .from("reservations")
    .insert({
      trs_id:   randomUUID(),
      status:          "IN_PROGRESS",
      notes:            notes           ?? null,
      date:             new Date().toISOString(),
      c_id:             c_id            ?? null,
      total_price:      total_price     ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select("*")
    .maybeSingle();
 
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
 
  return NextResponse.json(
    { message: "reservation successfully made ", reservation: data },
    { status: 201 }
  );
}


export async function GET(request){


    const {data: reservation, error: Error} = await supabase
    .from("reservations")
    .select("*")

    if (Error){
        return NextResponse.json({
            message:Error.message
        })
    }



    return NextResponse.json({reservation}, {status: 200})
}
