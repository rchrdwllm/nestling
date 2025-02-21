import {
  BookMarked,
  CalendarDays,
  Mail,
  Info,
  CircleHelp,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SidebarItem = {
  label: string;
  href: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const studentSidebarItems: SidebarItem[] = [
  {
    label: "Courses",
    href: "/student-courses",
    Icon: BookMarked,
  },
  {
    label: "Calendar",
    href: "/student-calendar",
    Icon: CalendarDays,
  },
  {
    label: "Inbox",
    href: "/student-inbox",
    Icon: Mail,
  },
  {
    label: "About",
    href: "/about",
    Icon: Info,
  },
  {
    label: "Help",
    href: "/help",
    Icon: CircleHelp,
  },
];
