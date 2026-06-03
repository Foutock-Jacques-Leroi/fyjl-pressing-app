import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";
import { randomUUID } from "crypto"

export async function GET(request) {
  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ reservations }, { status: 200 });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const srv_id = formData.get("service_id");
    const trs_id = formData.get("trs_id");
    const id = randomUUID();

    const { data, error } = await supabase
      .from("reservation_items")
      .insert([
        {
          id,
          srv_id,
          trs_id
        }
      ]);
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } 
}