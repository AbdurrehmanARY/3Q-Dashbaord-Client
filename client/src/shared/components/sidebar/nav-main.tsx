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

function isRouteActive(url: string, pathname: string) {
  return url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/");
}

/**
 * Renders the app's nav tree on the official `SidebarMenuButton`/`SidebarMenuSub*`
 * primitives instead of hand-rolled links — collapsed-mode icon sizing and the
 * collapsed-mode tooltip both come from those primitives' own CSS/`tooltip` prop, so
 * this doesn't need to branch on collapsed state itself the way the old implementation did.
 */
export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
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
            {item.items?.map((sub) =>
              sub.url ? (
                <SidebarMenuSubItem key={sub.url}>
                  <SidebarMenuSubButton render={<NavLink to={sub.url} />} isActive={isRouteActive(sub.url, pathname)}>
                    <span>{sub.title}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ) : null
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
