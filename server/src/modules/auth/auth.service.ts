import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "./auth.repository";
import { env } from "@config/env";
import {
  ApiError,
  ConflictError,
  UnauthorizedError,
} from "@shared/errors/ApiError";
import { userRoleEnum, users } from "@db/schema";

const SALT_ROUNDS = 12;

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private generateTokens(payload: JwtPayload): TokenPair {
    const secret = env.JWT_SECRET as jwt.Secret;
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
    return { accessToken, refreshToken };
  }

  private verifyToken(token: string): JwtPayload {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET as string) as unknown as JwtPayload;
      return payload;
    } catch {
      throw new UnauthorizedError("Invalid or expired token");
    }
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role: (typeof userRoleEnum.enumValues)[number];
  }) {
    const existing = await authRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("Email already registered");
    }

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
    });

    const tokens = this.generateTokens({
      sub: user.id,
      email: user.email!,
      role: user.role,
    });

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(email: string, password: string) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Account is deactivated");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const tokens = this.generateTokens({
      sub: user.id,
      email: user.email!,
      role: user.role,
    });

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async refresh(refreshToken: string) {
    const payload = this.verifyToken(refreshToken);
    const user = await authRepository.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedError("User not found or deactivated");
    }

    const tokens = this.generateTokens({
      sub: user.id,
      email: user.email!,
      role: user.role,
    });

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async getProfile(userId: number) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: typeof users.$inferSelect) {
    const { passwordHash, ...safe } = user;
    return safe;
  }
}

export const authService = new AuthService();