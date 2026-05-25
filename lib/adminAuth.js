import { requireAuth } from "./sessions";
import { redirect } from "next/navigation";

// Helper pour protéger les pages admin côté serveur
export async function protectAdminPage() {
  try {
    const user = await requireAuth();
    
    // Vérifier si l'utilisateur est admin (numéro spécifique)
    if (user.numero !== "677255089") {
      redirect("/auth/login");
    }
    
    return user;
  } catch (error) {
    redirect("/auth/login");
  }
}

// Helper pour les API routes admin
export async function protectAdminRoute(handler) {
  return async (request, context) => {
    try {
      const user = await requireAuth();
      
      if (user.numero !== "677255089") {
        return new Response(
          JSON.stringify({ message: "Accès refusé. Vous n'êtes pas administrateur." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Passer l'utilisateur au handler
      request.user = user;
      return handler(request, context);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Non authentifié. Veuillez vous connecter." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  };
}
