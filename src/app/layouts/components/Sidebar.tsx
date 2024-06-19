import Logout from "@/app/user/components/logout";
import BrandSection from "./BrandSection";
import SideMenu from "./SideMenu";

export default function Sidebar() {
  return (
    <div className="bg-foreground dark:bg-background border-border border-r h-full w-full text-white rounded-lg p-2 shadow-md flex flex-col">
      <BrandSection />
      <SideMenu />
      <Logout />
    </div>
  );
}
