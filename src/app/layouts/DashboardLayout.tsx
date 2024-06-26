"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LayoutContextProvider, { LayoutContext } from "./context";
import DrawerToggle from "./components/DrawerToggle";

import { usePathname } from "next/navigation";
import { User } from "../models/user";

export const UserContext = createContext<{
  user?: User | null;
  setUser: Function;
}>({
  user: null,
  setUser: (arg: any) => {},
});

function Main({ children }: { children: ReactNode }) {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  const pathName = usePathname();

  return (
    <>
      {isDrawerCollapsed && (
        <div className="block md:hidden fixed top-0 left-0">
          <DrawerToggle />
        </div>
      )}
      <div className="flex w-full p-2 h-screen justify-between overflow-hidden ">
        <div
          className={`${
            isDrawerCollapsed
              ? "opacity-0 w-[0%] md:opacity-100 md:w-[4%]"
              : "opacity-1 w-full md:w-[15%]"
          } transition-all`}
        >
          <Sidebar />
        </div>
        <main
          className={`${
            isDrawerCollapsed
              ? "w-full  md:w[95%] md:px-2"
              : "opacity-10 md:opacity-100 w-0 md:w-[84%] md:px-0 "
          } transition-all px-4 md:py-1 overflow-y-scroll scrollbar-hide relative`}
        >
          <Header />

          <div className="relative">
            <div
            // key={pathName}
            // initial={{ translateY: 100, opacity: 0 }}
            // animate={{ translateY: 0, opacity: 1 }}
            // exit={{ translateY: 100, opacity: 0 }}
            // transition={{
            //   duration: 0.4,
            //   ease: [0.22, 1, 0.36, 1],
            // }}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default function DashboardLayout({
  children,
  userData,
}: {
  children: ReactNode;
  userData: any;
}) {
  const [user, setUser] = useState(userData);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LayoutContextProvider>
        <Main>{children}</Main>
      </LayoutContextProvider>
    </UserContext.Provider>
  );
}
