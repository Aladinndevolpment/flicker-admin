import DashboardLayout from "@/app/layouts/DashboardLayout";
import { decrypt } from "@/utils/crypto";
import { cookies } from "next/headers";

const userData = cookies().get("user");
if (!userData?.value) {
  cookies().delete("session");
}

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await decrypt(userData?.value);
  console.log(user);
  return <DashboardLayout>{children}</DashboardLayout>;
}
