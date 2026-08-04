import {
  LayoutDashboard,
  FileText,
  Factory,
  Building2,
  Boxes,
  ShoppingCart,
  Package,
  Cpu,
  Users,
  Settings,
  Droplet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: NavItem[];
  roles?: string[];
}

export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Work Orders",
    url: "/work-orders",
    icon: FileText,
  },
  {
    title: "Production Orders",
    url: "/production-orders",
    icon: Factory,
  },
  {
    title: "Master Data",
    icon: Settings,
    items: [
      {
        title: "Companies & Brands",
        url: "/companies",
        icon: Building2,
      },
      {
        title: "Material Master",
        url: "/materials",
        icon: Boxes,
      },
      {
        title: "Machines",
        url: "/machines",
        icon: Cpu,
      },
      {
        title: "Operators",
        url: "/operators",
        icon: Users,
      },
    ],
  },
  {
    title: "Purchases & Receiving",
    icon: ShoppingCart,
    items: [
      {
        title: "Roll Purchases",
        url: "/purchases/rolls",
        icon: ShoppingCart,
      },
      {
        title: "Thread Receiving",
        url: "/purchases/threads",
        icon: Boxes,
      },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      {
        title: "Roll Stock",
        url: "/inventory/rolls",
        icon: Package,
      },
      {
        title: "Undyed Thread Stock",
        url: "/inventory/threads/undyed",
        icon: Boxes,
      },
      {
        title: "Dyed Thread Stock",
        url: "/inventory/threads/dyed",
        icon: Droplet,
      },
    ],
  },
];
