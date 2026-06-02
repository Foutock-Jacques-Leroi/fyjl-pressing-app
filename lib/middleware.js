import { NextResponse } from "next/server";
import { getSessionUser } from "./sessions";


export async function Middleware(request){

    //get session user

    const sessionUser = await getSessionUser()
    console.log(sessionUser)

    // public routes laisser passer
    const { pathname } = request.nextUrl()

    const publicRoute = ["/auth/login","/auth/signup"]

    if (publicRoute.includes(pathname)){
        return NextResponse.next()
    }

    // if not registered redirect to login
    if (!sessionUser?.client){
        return NextResponse.redirect(new URL('/auth/signup', request.url))
    }

    // check if admin
    if (pathname.startsWith("/admin") && sessionUser.client.numero !== "677255089"){
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    //check if 

    if (pathname.startsWith('/clientsPage') && session.user.role !== 'CLIENT') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next()
}

  export const config = {
   matcher:[
    "/admin/clients/:path*",
    "/admin/reservations/:path*",
    "/admin/service/:path*",
    "/clientsPage/clients/api/:path*",
    "/clientsPage/reservations/api/:path*",
    "/clientsPage/service/api/:path*",
    "/clientsPage",
    "/api/auth/:path*",
   ]
  }
