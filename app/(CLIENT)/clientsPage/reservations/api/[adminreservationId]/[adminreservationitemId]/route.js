import { NextResponse } from "next/server";
import supabase from "@/lib/supadb";

export async function GET(request, { params }) {
  const { adminreservationId, adminreservationitemId } = params;

  if (!adminreservationId || !adminreservationitemId) {
    return NextResponse.json(
      { message: "L'ID de réservation et l'ID d'article sont requis." },
      { status: 400 }
    );
  }

  const { data: item, error } = await supabase
    .from("reservation_items")
    .select(`*, service(name, description, price), reservation(trs_id, status, date, total_price, notes)`)
    .eq("item_id", adminreservationitemId)
    .eq("trs_id", adminreservationId)
    .single();

  if (error || !item) {
    return NextResponse.json(
      { message: error?.message || "Élément de réservation introuvable." },
      { status: 404 }
    );
  }

  return NextResponse.json({ item }, { status: 200 });
}
