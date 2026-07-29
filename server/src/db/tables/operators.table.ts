import { pgTable, serial, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users.table";

export const operators = pgTable("operators", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  employeeCode: varchar("employee_code", { length: 100 }),
  designation: varchar("designation", { length: 50 }).notNull().default("Printing"),
  shift: varchar("shift", { length: 50 }),
  status: varchar("status", { length: 50 }).notNull().default("Active"),
  /** Optional link to the staff directory, so floor activity can be attributed to a user. */
  userId: integer("user_id").references(() => users.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
