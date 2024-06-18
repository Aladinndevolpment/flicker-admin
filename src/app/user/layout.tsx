import DashboardLayout from "@/app/layouts/DashboardLayout";
import { decrypt } from "@/utils/crypto";
import { cookies } from "next/headers";
import { logout } from "../auth/actions";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = cookies().get("user");
  if (userData?.value) {
    // cookies().delete("session");
    // logout();
  }

  const user = await decrypt(userData?.value);
  console.log(user);
  return (
    <DashboardLayout>
      {user?.full_name} {children}
    </DashboardLayout>
  );
}
