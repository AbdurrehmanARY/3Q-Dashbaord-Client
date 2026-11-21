import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "@shared/errors/ApiError";
import type { AuthenticatedRequest } from "./auth";

export const PERMISSIONS = {
  CEO_READ: "ceo:read",

  WORK_ORDERS_READ: "work-orders:read",
  WORK_ORDERS_CREATE: "work-orders:create",
  WORK_ORDERS_UPDATE: "work-orders:update",
  WORK_ORDERS_DISPATCH: "work-orders:dispatch",
  WORK_ORDERS_DELETE: "work-orders:delete",

  PRODUCTION_READ: "production:read",
  PRODUCTION_CREATE: "production:create",
  PRODUCTION_UPDATE: "production:update",
  PRODUCTION_DELETE: "production:delete",
  PRODUCTION_PLAN: "production:plan",
  PRODUCTION_ASSIGN: "production:assign",
  PRODUCTION_PROGRESS: "production:progress",
  PRODUCTION_COMPLETE: "production:complete",
  PRODUCTION_RECONCILE: "production:reconcile",

  BATCHES_READ: "batches:read",
  BATCHES_CREATE: "batches:create",
  BATCHES_UPDATE: "batches:update",
  BATCHES_DELETE: "batches:delete",
  BATCHES_START: "batches:start",
  BATCHES_OUTPUT: "batches:output",
  BATCHES_COMPLETE: "batches:complete",
  BATCHES_CANCEL: "batches:cancel",

  INVENTORY_READ: "inventory:read",
  INVENTORY_CREATE: "inventory:create",
  INVENTORY_UPDATE: "inventory:update",
  INVENTORY_DELETE: "inventory:delete",

  MATERIALS_READ: "materials:read",
  MATERIALS_CREATE: "materials:create",
  MATERIALS_UPDATE: "materials:update",
  MATERIALS_DELETE: "materials:delete",

  PURCHASES_READ: "purchases:read",
  PURCHASES_CREATE: "purchases:create",
  PURCHASES_UPDATE: "purchases:update",
  PURCHASES_DELETE: "purchases:delete",

  THREAD_READ: "thread:read",
  THREAD_CREATE: "thread:create",
  THREAD_UPDATE: "thread:update",
  THREAD_DELETE: "thread:delete",
  THREAD_DYE: "thread:dye",

  INK_READ: "ink:read",
  INK_CREATE: "ink:create",
  INK_UPDATE: "ink:update",
  INK_DELETE: "ink:delete",

  MACHINES_READ: "machines:read",
  MACHINES_CREATE: "machines:create",
  MACHINES_UPDATE: "machines:update",
  MACHINES_DELETE: "machines:delete",

  OPERATORS_READ: "operators:read",
  OPERATORS_CREATE: "operators:create",
  OPERATORS_UPDATE: "operators:update",
  OPERATORS_DELETE: "operators:delete",

  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",

  ANALYTICS_READ: "analytics:read",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ceo: [PERMISSIONS.CEO_READ, PERMISSIONS.ANALYTICS_READ],

  office_staff: [
    PERMISSIONS.WORK_ORDERS_READ,
    PERMISSIONS.WORK_ORDERS_CREATE,
    PERMISSIONS.WORK_ORDERS_UPDATE,
    PERMISSIONS.WORK_ORDERS_DISPATCH,
    PERMISSIONS.WORK_ORDERS_DELETE,
    PERMISSIONS.PRODUCTION_READ,
    PERMISSIONS.MATERIALS_READ,
    PERMISSIONS.PURCHASES_READ,
  ],

  production_manager: [
    PERMISSIONS.PRODUCTION_READ,
    PERMISSIONS.PRODUCTION_CREATE,
    PERMISSIONS.PRODUCTION_UPDATE,
    PERMISSIONS.PRODUCTION_DELETE,
    PERMISSIONS.PRODUCTION_PLAN,
    PERMISSIONS.PRODUCTION_ASSIGN,
    PERMISSIONS.PRODUCTION_PROGRESS,
    PERMISSIONS.PRODUCTION_COMPLETE,
    PERMISSIONS.PRODUCTION_RECONCILE,
    PERMISSIONS.BATCHES_READ,
    PERMISSIONS.BATCHES_CREATE,
    PERMISSIONS.BATCHES_UPDATE,
    PERMISSIONS.BATCHES_DELETE,
    PERMISSIONS.BATCHES_START,
    PERMISSIONS.BATCHES_OUTPUT,
    PERMISSIONS.BATCHES_COMPLETE,
    PERMISSIONS.BATCHES_CANCEL,
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.INVENTORY_CREATE,
    PERMISSIONS.INVENTORY_UPDATE,
    PERMISSIONS.INVENTORY_DELETE,
    PERMISSIONS.MATERIALS_READ,
    PERMISSIONS.MATERIALS_CREATE,
    PERMISSIONS.MATERIALS_UPDATE,
    PERMISSIONS.MATERIALS_DELETE,
    PERMISSIONS.PURCHASES_READ,
    PERMISSIONS.PURCHASES_CREATE,
    PERMISSIONS.PURCHASES_UPDATE,
    PERMISSIONS.PURCHASES_DELETE,
    PERMISSIONS.THREAD_READ,
    PERMISSIONS.THREAD_CREATE,
    PERMISSIONS.THREAD_UPDATE,
    PERMISSIONS.THREAD_DELETE,
    PERMISSIONS.THREAD_DYE,
    PERMISSIONS.INK_READ,
    PERMISSIONS.INK_CREATE,
    PERMISSIONS.INK_UPDATE,
    PERMISSIONS.INK_DELETE,
    PERMISSIONS.MACHINES_READ,
    PERMISSIONS.MACHINES_CREATE,
    PERMISSIONS.MACHINES_UPDATE,
    PERMISSIONS.MACHINES_DELETE,
    PERMISSIONS.OPERATORS_READ,
    PERMISSIONS.OPERATORS_CREATE,
    PERMISSIONS.OPERATORS_UPDATE,
    PERMISSIONS.OPERATORS_DELETE,
    PERMISSIONS.WORK_ORDERS_READ,
    PERMISSIONS.WORK_ORDERS_UPDATE,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.CEO_READ,
  ],

  accountant: [
    PERMISSIONS.WORK_ORDERS_READ,
    PERMISSIONS.WORK_ORDERS_DISPATCH,
    PERMISSIONS.WORK_ORDERS_UPDATE,
    PERMISSIONS.CEO_READ,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.PRODUCTION_READ,
    PERMISSIONS.INVENTORY_READ,
  ],
};

export function requirePermission(...permissions: Permission[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ForbiddenError("Authentication required");
    }

    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];

    const hasPermission = permissions.some((p) => userPermissions.includes(p));

    if (!hasPermission) {
      throw new ForbiddenError(
        `Insufficient permissions. Required: ${permissions.join(" or ")}`
      );
    }

    next();
  };
}

export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // When there's no authenticated user (dev mode via optionalAuth), allow access.
    // In production the global authenticate middleware guarantees req.user is set.
    if (!req.user) {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(
        `Access denied. Required role: ${roles.join(" or ")}`
      );
    }

    next();
  };
}

export function requireProductionManager() {
  return requireRole("production_manager", "ceo");
}

export function requireWorkOrderAccess() {
  return requireRole("office_staff", "production_manager", "accountant", "ceo");
}

export function requireDispatchAccess() {
  return requireRole("office_staff", "production_manager", "accountant");
}