import supabase from "@/lib/supadb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto"

export async function GET(request) {
  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reservations }, { status: 200 })
}




export async function POST(request) {
  try {
    // ✅ Read FormData instead of JSON
    const formData = await request.formData()

    const c_id = formData.get("c_id")
    const notes = formData.get("notes")
    const date = formData.get("date")

    console.log(c_id, notes, date)

    if (!notes || !date || !c_id) {
      return NextResponse.json({ error: "Notes, date and c_id are required." }, { status: 400 })}

    const { data: reservation, error } = await supabase
      .from("reservations")
      .insert({
        trs_id: randomUUID(),
        notes,
        date,
        status: "IN_PROGRESS",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        c_id,
      })
      .select()      // ✅ .select() not .MaybeSingle()
      .single()      // ✅ returns the inserted row

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ reservation }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}