import { NextResponse, NextRequest } from "next/server";
import { encrypt } from "./utils/crypto";
import APIRoutes from "./constants/api_routes";
import APIController from "./controllers/remote_controller";

// Middleware function to handle requests
export async function middleware(request: NextRequest) {
  const url = request.url;
  const session = request.cookies.get("session");
  const user = request.cookies.get("user");

  // Handle requests to /auth/login
  if (url.includes("/auth/login")) {
    if (!session) {
      if (user) {
        const r = NextResponse.next();
        r.cookies.delete("user");
        return r;
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/user", url));
    }
  }

  // Handle requests to /user
  if (url.includes("/user") && !session) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Prepare the response
  const response = NextResponse.next();

  // If user and session cookies exist, proceed

  if (user?.value && session?.value) {
    return response;
  }

  // Fetch user data if session exists but user cookie does not
  if (session?.value) {
    const date = new Date();
    try {
      const userD = await APIController.get(APIRoutes.me, session.value);

      // console.log(userD);
      const enc_data = await encrypt(userD);
      response.cookies.set("user", enc_data, {
        expires: new Date(date.getTime() + 24 * 60 * 60 * 1000), // 1 day expiration
      });
    } catch (e: any) {
      console.error("Error fetching user data:", e);
      response.cookies.delete("session");
      response.cookies.delete("user");
      return NextResponse.redirect(new URL("/auth/login", url));
    }
  }

  return response;
}

// Config to define path matching for the middleware
export const config = {
  matcher: ["/user/:path*", "/auth/login"],
};
