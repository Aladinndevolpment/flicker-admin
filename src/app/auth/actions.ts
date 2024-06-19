"use server";

import APIRoutes from "@/constants/api_routes";
import APIController from "@/controllers/remote_controller";
import { encrypt } from "@/utils/crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(values: any): Promise<void> {
  const data = await APIController.get(
    "https://backend.jkjjewellers.in/store/products/"
  );
  return data;
}

export async function login(values: any) {
  try {
    const res = await APIController.post(APIRoutes.auth, values);
    await cookies().set("session", res.access);
    const user = await APIController.get(APIRoutes.me, res.access);
    const date = new Date();
    console.log(user);
    const enc_data = await encrypt(user);
    cookies().set("user", enc_data, {
      expires: new Date(date.getTime() + 24 * 60 * 60 * 1000), // 1 day expiration
    });
    return { status: 200, data: res };
  } catch (e: any) {
    // console.log(e);
    return {
      status: e.response.status,
      data: e.response.data,
    };
  }
}

export async function logout() {
  // console.log("here");
  await cookies().delete("session");
  await cookies().delete("user");
  return redirect("/auth/login");
}
