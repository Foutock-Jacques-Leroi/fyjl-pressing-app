import ClientNavbar from "@/app/Components/clientNavbar"

export default async function Layout({children}){

return(
    <>
    
    <html>

    <body>
        <main>
            <ClientNavbar />
            {children}
        </main>
    </body>

    </html>
    
    </>
)

}