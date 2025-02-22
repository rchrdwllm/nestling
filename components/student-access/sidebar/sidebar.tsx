"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { studentSidebarItems } from "@/constants/sidebar-items";
import SidebarLink from "./sidebar-link";
import UserBtn from "./user-btn";

const Sidebar = () => {
  return (
    <aside className="flex flex-col border border-border h-full bg-background rounded-xl p-3 pt-8">
      <Link href="/student-dashboard">
        <Image src={logo} alt="Logo" className="size-10 object-contain" />
      </Link>
      <div className="flex flex-col gap-4 mt-10">
        {studentSidebarItems.map((item) => (
          <SidebarLink key={item.href} {...item} />
        ))}
      </div>
      <UserBtn />
    </aside>
  );
};

export default Sidebar;
