import { db } from "./index";
import { users } from "@db/schema";
import bcrypt from "bcryptjs";

async function seedUsers() {
  console.log("Seeding users...");

  const passwordHash = await bcrypt.hash("Seed123!@#", 12);

  const userData = [
    { name: "Office Staff", role: "office_staff" as const, email: "office.staff@3q.test", passwordHash },
    { name: "Production Manager", role: "production_manager" as const, email: "production.manager@3q.test", passwordHash },
    { name: "Production Operator", role: "production_operator" as const, email: "production.operator@3q.test", passwordHash },
  ];

  for (const user of userData) {
    try {
      const [inserted] = await db.insert(users).values(user).onConflictDoNothing({ target: users.email }).returning();
      if (inserted) {
        console.log(`Created user: ${inserted.name} (${inserted.role}) - ${inserted.email}`);
      } else {
        console.log(`User already exists: ${user.email} (skipped)`);
      }
    } catch (error) {
      console.error(`Failed to create user ${user.email}:`, error);
    }
  }

  console.log("User seeding completed!");
}

seedUsers().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});