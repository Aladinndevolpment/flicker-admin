import DashboardLayout from "@/app/layouts/DashboardLayout";
import { decrypt } from "@/utils/crypto";
import { cookies } from "next/headers";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = cookies().get("user");
  if (!userData?.value) {
    cookies().delete("session");
  }

  const user = await decrypt(userData?.value);
  console.log(user);
  return <DashboardLayout>{children}</DashboardLayout>;
}
