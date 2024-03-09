import { NextRequest, NextResponse } from 'next/server';
import { redirectBasedOnRole } from './app/lib/auth';

export  async function middleware(request: NextRequest) {
    // console.log(request.cookies);
    const token = request.cookies.get('token');
  const role = request.cookies.get('role');
    console.log("DEBUG:: For path "+request.nextUrl.pathname );
    if(token){
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            console.log("DEBUG:: MIDDLEWARE LOGIN Path");
            return redirectBasedOnRole(request,role?.value!);
        }
    }
    else{
        console.log("DEBUG:: Token not present");
        if((request.nextUrl.pathname.startsWith('/login'))){
            return NextResponse.next();
        }
        else if (request.nextUrl.pathname.startsWith('/register')) {
            return NextResponse.next();
        }
        else if((request.nextUrl.pathname==('/'))){
            return NextResponse.next();
        }
      //   else if((request.nextUrl.pathname==('/api/users/'))){
      //     return NextResponse.next();
      // }

        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Add more logic here if you need to check user roles
    // and redirect or modify the request accordingly

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
}





















// import { NextResponse,NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

// //   // Define paths that are considered public (accessible without a token)
//   const isPublicPath = path === '/login' || path === '/register' 

// //   // Get the token from the cookies
//   const token = request.cookies.get('token')?.value || ''

// //   // Redirect logic based on the path and token presence
//   if(isPublicPath && token) {

//  // If trying to access a public path with a token, redirect to the home page
//     return NextResponse.redirect(new URL('/', request.nextUrl))
//   }

// // If trying to access a protected path without a token, redirect to the login page
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }
// // console.log('lol!!!')
// }



// // It specifies the paths for which this middleware should be executed. 
// // In this case, it's applied to '/', '/profile', '/login', and '/signup'.
// export const config = {
//   matcher: [
//     // '/',
//     // '/profile',
//     // '/login',
//     // '/signup',
//     // '/verifyemail'
//   ]
// }