"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import {
  instructorSidebarItems,
  studentSidebarItems,
} from "@/constants/sidebar-items";
import SidebarLink from "./sidebar-link";
import UserBtn from "./user-btn";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMemo } from "react";

const Sidebar = () => {
  const { user } = useCurrentUser();
  const sidebarItems = useMemo(() => {
    const role = user?.role;

    if (role === "student") {
      return studentSidebarItems;
    } else if (role === "instructor") {
      return instructorSidebarItems;
    }

    return [];
  }, [user]);
  const homeLink = useMemo(() => {
    const role = user?.role;

    if (role === "student") {
      return "/student-dashboard";
    } else if (role === "instructor") {
      return "/instructor-dashboard";
    }

    return "/";
  }, [user]);

  return (
    <aside className="h-[calc(100vh-1rem)] sticky top-2 flex flex-col border border-border bg-background rounded-xl p-3 pt-8">
      <Link href={homeLink}>
        <Image src={logo} alt="Logo" className="size-10 object-contain" />
      </Link>
      <div className="flex flex-col gap-4 mt-10">
        {sidebarItems.map((item) => (
          <SidebarLink key={item.href} {...item} />
        ))}
      </div>
      <UserBtn />
    </aside>
  );
};

export default Sidebar;
