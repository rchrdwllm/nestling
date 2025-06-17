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
import SearchBtn from "@/components/shared/search/general-search/search-btn";

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
        "top-2 z-10 sticky flex flex-col items-center bg-background shadow-sm p-3 border border-border rounded-xl h-[calc(100vh-1rem)] py-4 justify-between"
      )}
    >
      <Link href="/dashboard" className="block">
        <Image
          src={logo}
          alt="Logo"
          className="rounded-lg size-10 object-contain"
        />
      </Link>
      <div className={cn("flex flex-col gap-4 justify-center items-center")}>
        {sidebarItems.map((item) => {
          if (item.href === "/notifications") {
            return <NotifLink key={item.href} {...item} />;
          }

          if (item.href === "/search") {
            return <SearchBtn key={item.href} />;
          }

          return <SidebarLink key={item.href} {...item} />;
        })}
      </div>
      <UserBtn />
    </aside>
  );
};

export default Sidebar;
