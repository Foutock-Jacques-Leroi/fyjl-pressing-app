import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Configuration de la session
export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: process.env.SESSION_COOKIE_NAME ?? "npc_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  },
};

// Récupère la session (dans les route handlers)
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, sessionOptions);
}

// Helper — récupère uniquement le user de la session
export async function getSessionUser() {
  const session = await getSession();
  return session?.client ?? null;
}

// Helper — vérifie si l'utilisateur est connecté
export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("NON_AUTHENTIFIE");
  }
  return user;
}

// Helper — vérifie si l'utilisateur est ADMIN
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.numero !== "677255089") {
    return "NON_AUTORISE"
  }
  return user;
}

export async function logout(request){

  const session = await getSession()
  session.destroy()

  redirect("/auth/login")

}