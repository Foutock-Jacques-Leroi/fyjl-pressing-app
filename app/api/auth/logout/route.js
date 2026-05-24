import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    session.destroy(); // ✅ efface le cookie chiffré
    return NextResponse.json({ message: "Déconnecté avec succès" });
  } catch (error) {
    console.error("[LOGOUT ERROR]", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}