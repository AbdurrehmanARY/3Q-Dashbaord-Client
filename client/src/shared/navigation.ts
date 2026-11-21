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
  Tag,
  BarChart3,
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
    roles: ["ceo"],
    items: [
      {
        title: "Overview",
        url: "/",
        icon: BarChart3,
        roles: ["ceo"],
      },
      {
        title: "Roll Stock",
        url: "/dashboard/roll-stock",
        icon: Package,
        roles: ["ceo"],
      },
      {
        title: "Thread Stock",
        url: "/dashboard/thread-stock",
        icon: Droplet,
        roles: ["ceo"],
      },
      {
        title: "Work Orders",
        url: "/dashboard/work-orders/printed",
        icon: FileText,
        roles: ["ceo"],
        items: [
          {
            title: "Printed Labels",
            url: "/dashboard/work-orders/printed",
            icon: FileText,
            roles: ["ceo"],
          },
          {
            title: "Woven Labels",
            url: "/dashboard/work-orders/woven",
            icon: FileText,
            roles: ["ceo"],
          },
        ],
      },
      {
        title: "Production Orders",
        url: "/dashboard/production-orders/printed",
        icon: Factory,
        roles: ["ceo"],
        items: [
          {
            title: "Printed Labels",
            url: "/dashboard/production-orders/printed",
            icon: FileText,
            roles: ["ceo"],
          },
          {
            title: "Woven Labels",
            url: "/dashboard/production-orders/woven",
            icon: FileText,
            roles: ["ceo"],
          },
        ],
      },
      {
        title: "CEO Dashboard",
        url: "/dashboard/ceo/work-orders/printed",
        icon: BarChart3,
        roles: ["ceo"],
        items: [
          {
            title: "Work Order Dashboard",
            url: "/dashboard/ceo/work-orders/printed",
            icon: FileText,
            roles: ["ceo"],
            items: [
              {
                title: "Printed Work Orders",
                url: "/dashboard/ceo/work-orders/printed",
                icon: FileText,
                roles: ["ceo"],
              },
              {
                title: "Woven Work Orders",
                url: "/dashboard/ceo/work-orders/woven",
                icon: FileText,
                roles: ["ceo"],
              },
            ],
          },
          {
            title: "Production Dashboard",
            url: "/dashboard/ceo/production/printed",
            icon: Factory,
            roles: ["ceo"],
            items: [
              {
                title: "Printed Production",
                url: "/dashboard/ceo/production/printed",
                icon: FileText,
                roles: ["ceo"],
              },
              {
                title: "Woven Production",
                url: "/dashboard/ceo/production/woven",
                icon: FileText,
                roles: ["ceo"],
              },
            ],
          },
        ],
      },
      {
        title: "Machines",
        url: "/dashboard/machines",
        icon: Cpu,
        roles: ["ceo"],
      },
      {
        title: "Operators",
        url: "/dashboard/operators",
        icon: Users,
        roles: ["ceo"],
      },
    ],
  },
  {
    title: "Work Orders",
    url: "/work-orders/printed",
    icon: FileText,
    roles: ["office_staff"],
    items: [
      {
        title: "Printed Labels",
        url: "/work-orders/printed",
        icon: FileText,
        roles: ["office_staff"],
      },
      {
        title: "Woven Labels",
        url: "/work-orders/woven",
        icon: FileText,
        roles: ["office_staff"],
      },
    ],
  },
  {
    title: "Production Orders",
    url: "/production-orders/printed",
    icon: Factory,
    roles: ["production_manager", "production_operator", "accountant", "ceo"],
    items: [
      {
        title: "Printed Labels",
        url: "/production-orders/printed",
        icon: FileText,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Woven Labels",
        url: "/production-orders/woven",
        icon: FileText,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
    ],
  },
  {
    title: "Master Data",
    icon: Settings,
    roles: ["production_manager", "production_operator", "accountant", "ceo"],
    items: [
      {
        title: "Companies & Brands",
        url: "/companies",
        icon: Building2,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Material Master",
        url: "/materials",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Sticker Materials",
        url: "/materials/stickers",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Local Sheets",
        url: "/materials/local-sheets",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Label Sheets",
        url: "/materials/label-sheets",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Label Types",
        url: "/label-types",
        icon: Tag,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Machines",
        url: "/machines",
        icon: Cpu,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Operators",
        url: "/operators",
        icon: Users,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
    ],
  },
  {
    title: "Purchases & Receiving",
    icon: ShoppingCart,
    roles: ["production_manager", "production_operator", "accountant", "ceo"],
    items: [
      {
        title: "Roll Purchases",
        url: "/purchases/rolls",
        icon: ShoppingCart,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Thread Receiving",
        url: "/purchases/threads",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Ink Purchases",
        url: "/purchases/ink",
        icon: Droplet,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Thread Dyeing Workflow",
        url: "/thread-dyeing",
        icon: Droplet,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    roles: ["production_manager", "production_operator", "accountant", "ceo"],
    items: [
      {
        title: "Roll Stock",
        url: "/inventory/rolls",
        icon: Package,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Undyed Thread Stock",
        url: "/inventory/threads/undyed",
        icon: Boxes,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Dyed Thread Stock",
        url: "/inventory/threads/dyed",
        icon: Droplet,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
      {
        title: "Ink Consumption",
        url: "/inventory/ink-consumption",
        icon: Droplet,
        roles: ["production_manager", "production_operator", "accountant", "ceo"],
      },
    ],
  },
];
