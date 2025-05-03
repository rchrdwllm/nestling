import {
  BookMarked,
  CalendarDays,
  Mail,
  Info,
  CircleHelp,
  LucideProps,
  BookOpen,
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
    href: "/student-about",
    Icon: Info,
  },
  {
    label: "Help",
    href: "/help",
    Icon: CircleHelp,
  },
];

export const instructorSidebarItems: SidebarItem[] = [
  {
    label: "Course Management",
    href: "/instructor-courses",
    Icon: BookOpen,
  },
  {
    label: "Calendar",
    href: "/instructor-calendar",
    Icon: CalendarDays,
  },
  {
    label: "Inbox",
    href: "/instructor-inbox",
    Icon: Mail,
  },
  {
    label: "About",
    href: "/student-about",
    Icon: Info,
  },
  {
    label: "Help",
    href: "/help",
    Icon: CircleHelp,
  },
];
