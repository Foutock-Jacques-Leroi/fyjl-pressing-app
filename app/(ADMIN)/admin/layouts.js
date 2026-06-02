import AdminSidebar from "@/app/Components/adminNavbar";
// import { Children } from "react";

export default function Layout({children}){
  return (
    <>
      <main>
        <AdminSidebar />
        {children}
      </main>
    </>
  )
}