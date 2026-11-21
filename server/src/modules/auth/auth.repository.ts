import { db } from "@db/index";
import { users, userRoleEnum } from "@db/schema";
import { eq } from "drizzle-orm";

export class AuthRepository {
  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return user;
  }

  async findById(id: number) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user;
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
    role: (typeof userRoleEnum.enumValues)[number];
  }) {
    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role,
        isActive: true,
      })
      .returning();
    return user;
  }
}

export const authRepository = new AuthRepository();