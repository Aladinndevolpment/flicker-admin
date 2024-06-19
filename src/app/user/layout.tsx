import DashboardLayout from "@/app/layouts/DashboardLayout";
import { decrypt } from "@/utils/crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch encrypted user from cookie.
  const userData = cookies().get("user");

  // Fallback if encrypted user isn't fount on first load.
  if (!userData?.value) {
    redirect("/user");
  }

  // Decrypting user
  const user = await decrypt(userData?.value);

  return (
    // Push to client components
    <DashboardLayout userData={user}>
      {/* {user?.full_name}  */}
      {children}
    </DashboardLayout>
  );
}
