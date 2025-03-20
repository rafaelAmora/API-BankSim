import { Response, Request, NextFunction } from "express";

import z, { number } from "zod";
import { db } from "../database/knex";
import { AppError } from "../utils/AppError";
import {
  passwordEncryption,
  passwordEncryptionValidation,
} from "../utils/password-encryption";

class UsersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password_hash: z.string().min(8),
      });

      let { name, email, password_hash } = bodySchema.parse(req.body);

      const emailUser = await db("users").select().where({ email }).first();

      if (emailUser) {
        throw new AppError("email already used");
      }

      password_hash = await passwordEncryption(password_hash);

      await db("users").insert({ name, email, password_hash });

      res.json("user created successfully!");
    } catch (error) {
      next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await db("users").select();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password_hash: z.string(),
        password_new: z.string().optional(),
      });
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.id);

      let { password_hash, email, name, password_new } = bodySchema.parse(
        req.body
      );

      const passWordDBUser = await db<UsersTypes>("users")
        .select()
        .where({
          id,
        })
        .first();

      if (!passWordDBUser) {
        throw new AppError("User not found");
      }

      const ValidationPassWord = await passwordEncryptionValidation(
        password_hash,
        passWordDBUser.password_hash
      );

      if (!ValidationPassWord) {
        throw new AppError("Password is incorrect");
      }

      const update = {
        name,
        email,
        updated_at: db.fn.now(),
        password_hash,
      };
      if (password_new) {
        const newPassWord = await passwordEncryption(password_new);
        update.password_hash = newPassWord;
      } else {
        update.password_hash = await passwordEncryption(password_hash);
      }
      await db<UsersTypes>("users").update(update).where({ id });

      res.json();
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
