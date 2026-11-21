import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  sidebarMenuButtonVariants,
  useSidebar,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/shared/navigation";
import { useAuthStore } from "@/store/auth-store";

function isRouteActive(url: string, pathname: string) {
  return url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/");
}

/**
 * Filters navigation items based on the user's role. Items with a `roles` array
 * are only shown if the user's role is included. The filtering is applied
 * recursively to all nested items.
 */
function filterNavItemsByRole(items: NavItem[], userRole: string | undefined): NavItem[] {
  return items
    .filter((item) => {
      if (!item.roles || item.roles.length === 0) return true;
      if (!userRole) return false;
      return item.roles.includes(userRole);
    })
    .map((item) => ({
      ...item,
      items: item.items ? filterNavItemsByRole(item.items, userRole) : undefined,
    }));
}

/**
 * Renders the app's nav tree on the official `SidebarMenuButton`/`SidebarMenuSub*`
 * primitives instead of hand-rolled links — collapsed-mode icon sizing and the
 * collapsed-mode tooltip both come from those primitives' own CSS/`tooltip` prop, so
 * this doesn't need to branch on collapsed state itself the way the old implementation did.
 */
export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const userRole = user?.role;

  const filteredItems = filterNavItemsByRole(items, userRole);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {filteredItems.map((item) =>
          item.items ? (
            <NavGroupItem key={item.title} item={item} pathname={pathname} />
          ) : item.url ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={<NavLink to={item.url} end={item.url === "/"} />}
                tooltip={item.title}
                isActive={isRouteActive(item.url, pathname)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavGroupItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const { state, isMobile } = useSidebar();
  const isAnyChildActive = item.items?.some((sub) => sub.url && isRouteActive(sub.url, pathname)) ?? false;
  // Opens by default when the route lands inside it; free to toggle by hand afterward —
  // a plain `defaultOpen` wouldn't re-sync if navigation lands here from elsewhere later.
  const [open, setOpen] = useState(isAnyChildActive);

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
        {/* Styled directly rather than nesting `SidebarMenuButton` here: its `tooltip`
            prop makes it return a `<Tooltip>`-wrapped tree, which isn't a single element
            `CollapsibleTrigger` can merge its own ref/props onto. The tooltip is handled
            around the trigger instead, matching what `SidebarMenuButton` does internally. */}
        <Tooltip>
          <TooltipTrigger
            render={
              <CollapsibleTrigger
                className={cn(sidebarMenuButtonVariants(), "w-full")}
                data-active={isAnyChildActive || undefined}
              />
            }
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </TooltipTrigger>
          <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
            {item.title}
          </TooltipContent>
        </Tooltip>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((sub) => (
              <NavSubItem key={sub.url} item={sub} pathname={pathname} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

/**
 * Renders items recursively for arbitrary nesting depth. This replaces the old
 * flat `SidebarMenuSubButton` approach in `NavGroupItem`, enabling deep CEO
 * dashboard hierarchies:
 *   CEO Dashboard
 *     → Work Order Dashboard
 *       → Printed Work Orders
 *       → Woven Work Orders
 *     → Production Dashboard
 *       → Printed Production
 *       → Woven Production
 */
function NavSubItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const { state, isMobile } = useSidebar();
  const hasChildren = item.items && item.items.length > 0;
  const isActive = item.url ? isRouteActive(item.url, pathname) : false;
  const isAnyChildActive = hasChildren
    ? item.items!.some((sub) => sub.url && isRouteActive(sub.url, pathname))
    : false;

  if (hasChildren) {
    // Recursive case: branch item → render collapsible with nested SidebarMenuSub
    const [open, setOpen] = useState(isAnyChildActive);

    return (
      <SidebarMenuSubItem>
        <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
          <Tooltip>
            <TooltipTrigger
              render={
                <CollapsibleTrigger
                  className={cn(sidebarMenuButtonVariants(), "w-full", "data-[size=md]:text-sm")}
                  data-active={isAnyChildActive || isActive || undefined}
                />
              }
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </TooltipTrigger>
            <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
              {item.title}
            </TooltipContent>
          </Tooltip>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items!.map((sub) => (
                <NavSubItem key={sub.url} item={sub} pathname={pathname} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  // Leaf case: no children → render as simple SidebarMenuSubButton
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        render={item.url ? <NavLink to={item.url} /> : undefined}
        isActive={isActive}
      >
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
