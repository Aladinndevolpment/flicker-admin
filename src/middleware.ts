import { NextResponse, NextRequest } from "next/server";
import { encrypt } from "./utils/crypto";
import APIController from "./controllers/remote_controller";
import APIRoutes from "./constants/api_routes";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.url;
  const successURL = NextResponse.redirect(new URL("/user", url));
  const loginURL = NextResponse.redirect(new URL("/auth/login", url));
  const response = NextResponse.next();
  const session = request.cookies.get("session");

  if (!session && url.includes("/auth/login")) {
    return response;
  } else if (!session && url.includes("/user")) {
    return loginURL;
  } else if (url.includes("/auth/login") && session) {
    return successURL;
  }

  const user = request.cookies.get("user");
  if (user?.value && session?.value) {
    // const decrypted_user = await decrypt(user.value);
    // console.log(decrypted_user);
    return response;
  }

  const date = new Date();
  try {
    const res = await APIController.get(APIRoutes.me, session?.value);
    const enc_data = await encrypt(res);
    response.cookies.set("user", enc_data, {
      expires: date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000),
    });
  } catch (e: any) {
    console.log("cookie here");
    // if (
    //   e.response.includes(
    //     "Cookies can only be modified in a Server Action or Route Handler"
    //   )
    // ) {
    //   console.log("cookie error -- bypassing.");
    //   return response;
    // }
    request.cookies.clear();
    console.log(e);
    return loginURL;
  }

  if (url) return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/auth/login", "/"],
};
