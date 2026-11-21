import { Request, Response } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { authService } from "./auth.service";
import type { RegisterDTO, LoginDTO } from "./auth.schema";
import { userRoleEnum } from "@db/schema";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as RegisterDTO & { role: (typeof userRoleEnum.enumValues)[number] };
    const result = await authService.register(data);
    res.status(201).json({ data: result });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginDTO;
    const result = await authService.login(email, password);
    res.json({ data: result });
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json({ data: result });
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.getProfile(req.user!.sub);
    res.json({ data: user });
  });
}

export const authController = new AuthController();