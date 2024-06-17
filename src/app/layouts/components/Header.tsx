import HeaderSearch from "./HeaderSearch";
import { MdTour, MdNotificationsNone } from "react-icons/md";
import DrawerToggle from "./DrawerToggle";
import ProfileBadge from "./ProfileBadge";
import { ModeToggle } from "@/app/components/ThemeToggler";
import { NavigationMenuDemo } from "../Nav";
import { Button } from "@/app/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-white bg-opacity-20 flex rounded-lg shadow-sm items-center sticky top-0 bg-clip-padding backdrop-filter backdrop-blur z-50">
      <div className="flex-1">
        <HeaderSearch />
      </div>
      <div className="px-3 flex space-x-1">
        <div className="hidden md:block">
          <NavigationMenuDemo />
        </div>
        <ModeToggle />
        <Button className="bg-background">
          <MdTour className="text-2xl text-muted-foreground" />
        </Button>
        <Button className="bg-background">
          <MdNotificationsNone className="text-2xl text-muted-foreground" />
        </Button>
        <ProfileBadge />
        <DrawerToggle isDark={true} />
      </div>
    </header>
  );
}
