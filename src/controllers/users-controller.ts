import { Response, Request, NextFunction } from "express";

import z from "zod";
import { db } from "../database/knex";
import { AppError } from "../utils/AppError";
import { passwordEncryption } from "../utils/password-encryption";

class UsersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password_hash: z.string().min(8),
      });

      let { name, email, password_hash } = bodySchema.parse(req.body);

      const emailUser = db("users").select().where({ email });

      if (!emailUser) {
        throw new AppError("email already used");
      }

      password_hash = await passwordEncryption(password_hash);

      await db("users").insert({ name, email, password_hash });

      res.json("user created successfully!");
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
