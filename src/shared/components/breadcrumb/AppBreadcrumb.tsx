import { Fragment } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ROOT_LABEL = "Home";

function pathToSegments(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => ({
      label: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: "/" + array.slice(0, index + 1).join("/"),
      isLast: index === array.length - 1,
    }));
}

const LINK_CLASSES = "transition-colors hover:text-foreground";

export function AppBreadcrumb() {
  const location = useLocation();
  const segments = pathToSegments(location.pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/" className={LINK_CLASSES}>
            <Home className="size-3.5" />
            <span className="sr-only">{ROOT_LABEL}</span>
          </Link>
        </BreadcrumbItem>
        {segments.map((segment) => (
          <Fragment key={segment.href}>
            <BreadcrumbSeparator>
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {segment.isLast ? (
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              ) : (
                <Link to={segment.href} className={LINK_CLASSES}>
                  {segment.label}
                </Link>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
