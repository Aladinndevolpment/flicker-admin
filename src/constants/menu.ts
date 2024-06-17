import { IconType } from "react-icons";
import { CgMenuLeftAlt, CgAbstract } from "react-icons/cg";

export type TSubMenu = {
  menuItem: string;
  href: string;
};

export type TMenu = {
  menuItem: string;
  href: string;
  subMenu: TSubMenu[];
  icon: IconType;
};

export type TMenuGroup = {
  title: string;
  menu: TMenu[];
  showGroupTitle: boolean;
};

export class Menu {
  static sideMenu: TMenuGroup[] = [
    {
      title: "Dashboard",
      showGroupTitle: false,
      menu: [
        {
          menuItem: "Dashboard",
          href: "/user",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Tasks",
          href: "/user/tasks",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Components",
          href: "/user/components",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Analytics",
          href: "/user/analytics",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Courses",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
      ],
    },
    {
      title: "Page",
      showGroupTitle: true,
      menu: [
        {
          menuItem: "About",
          href: "/user/dashboard",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Profile",
          href: "/user/profile/form",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Notifications",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Others",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Contact",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
      ],
    },
    {
      title: "Analytics",
      showGroupTitle: true,
      menu: [
        {
          menuItem: "Employee",
          href: "/user/dashboard",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Charts",
          href: "/user/",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Cards",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Interviews",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Courses",
          href: "/user/",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
      ],
    },
  ];
}
