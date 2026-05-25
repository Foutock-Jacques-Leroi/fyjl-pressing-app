import { protectAdminPage } from "@/lib/adminAuth";

export default async function AdminServicesPage() {
  // Protéger la page - rediriger si non authentifié ou non admin
  const admin = await protectAdminPage();

  return (
    <>
      <div className="text-6xl text-amber-300">Gestion des Services</div>
      <p>Connecté en tant que: {admin.name}</p>
    </>
  );
}
