import {
  BookMarked,
  CalendarDays,
  Mail,
  Info,
  CircleHelp,
  LucideProps,
  BookOpen,
  KanbanSquare,
  ChartColumnIncreasing,
  Bell,
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
    href: "/courses",
    Icon: BookMarked,
  },
  {
    label: "Calendar",
    href: "/calendar",
    Icon: CalendarDays,
  },
  {
    label: "Inbox",
    href: "/inbox",
    Icon: Mail,
  },
  {
    label: "Notifications",
    href: "/notifications",
    Icon: Bell,
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

export const instructorSidebarItems: SidebarItem[] = [
  {
    label: "Course Management",
    href: "/courses",
    Icon: BookOpen,
  },
  {
    label: "Calendar",
    href: "/calendar",
    Icon: CalendarDays,
  },
  {
    label: "Projects",
    href: "/projects",
    Icon: KanbanSquare,
  },
  {
    label: "Inbox",
    href: "/inbox",
    Icon: Mail,
  },
  {
    label: "Notifications",
    href: "/notifications",
    Icon: Bell,
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

export const adminSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: ChartColumnIncreasing,
  },
  {
    label: "Course Management",
    href: "/courses",
    Icon: BookOpen,
  },
  {
    label: "Projects",
    href: "/projects",
    Icon: KanbanSquare,
  },
  {
    label: "Calendar",
    href: "/calendar",
    Icon: CalendarDays,
  },
  {
    label: "Notifications",
    href: "/notifications",
    Icon: Bell,
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
