import {
  LayoutDashboard,
  FileText,
  Factory,
  Building2,
  Boxes,
  ShoppingCart,
  Package,
  Cpu,
  Settings,
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
        title: "Machines & Operators",
        url: "/machines-operators",
        icon: Cpu,
      },
    ],
  },
  {
    // Covers both material purchases (printed) and thread receiving (woven), as tabs.
    title: "Purchases & Receiving",
    url: "/purchases",
    icon: ShoppingCart,
  },
  {
    // Covers both roll stock (printed) and thread stock + dyeing (woven), as tabs.
    title: "Inventory",
    url: "/inventory",
    icon: Package,
  },
];
