import ClientNavbar from "@/app/Components/clientNavbar"
import { Toaster } from "@/components/ui/sonner"


export default async function Layout({children}){
  return (
    <>
      <ClientNavbar />
      {children}
      <Toaster />
    </>
  )
}