import HeaderSearch from "./HeaderSearch";
import { MdTour, MdNotificationsNone } from "react-icons/md";
import DrawerToggle from "./DrawerToggle";
import ProfileBadge from "./ProfileBadge";
import { ModeToggle } from "@/app/components/ThemeToggler";
import { NavigationMenuDemo } from "../Nav";
import { Button } from "@/app/components/ui/button";

export default function Header() {
  return (
    <header className="py-1 px-2 w-full bg-white dark:bg-slate-950 bg-opacity-80 active:bg-opacity-100 hover:bg-opacity-100 flex rounded-xl shadow-sm items-center sticky top-0 bg-clip-padding backdrop-filter backdrop-blur z-50">
      <DrawerToggle isDark={true} />
      <div className="flex-1">
        <HeaderSearch />
      </div>
      <div className="px-3 flex space-x-3">
        <ModeToggle />
        <ProfileBadge />
      </div>
    </header>
  );
}
