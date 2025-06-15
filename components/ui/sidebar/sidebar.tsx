"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import {
  adminSidebarItems,
  instructorSidebarItems,
  studentSidebarItems,
} from "@/constants/sidebar-items";
import SidebarLink from "./sidebar-link";
import UserBtn from "./user-btn";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMemo } from "react";
import NotifLink from "./notif-link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { user } = useCurrentUser();
  const sidebarItems = useMemo(() => {
    const role = user?.role;

    if (role === "student") {
      return studentSidebarItems;
    } else if (role === "instructor") {
      return instructorSidebarItems;
    } else if (role === "admin") {
      return adminSidebarItems;
    }

    return [];
  }, [user]);

  return (
    <aside
      className={cn(
        "top-2 z-10 sticky flex flex-col items-center bg-background shadow-sm p-3 border border-border rounded-xl h-[calc(100vh-1rem)]",
        user.role === "admin" ? "py-4 justify-between" : "pt-8"
      )}
    >
      <Link href="/dashboard" className="block">
        <Image src={logo} alt="Logo" className="size-10 object-contain" />
      </Link>
      <div
        className={cn(
          "flex flex-col gap-4",
          user.role === "admin" ? "items-center justify-between" : "mt-10"
        )}
      >
        {sidebarItems.map((item) => {
          if (item.href === "/notifications") {
            return <NotifLink key={item.href} {...item} />;
          }

          return <SidebarLink key={item.href} {...item} />;
        })}
      </div>
      <UserBtn />
    </aside>
  );
};

export default Sidebar;
