"use server";

import APIRoutes from "@/constants/api_routes";
import APIController from "@/controllers/remote_controller";
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
