import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { ZodError } from "zod";

 function errorHandling(
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
     res.status(error.statusCode).json({ message: error.message });
     return
  }
  if (error instanceof ZodError) {
     res
      .status(400)
      .json({ message: "Validation Error", issues: error.format() });
      return
  }

  res.status(500).json({ message: error.message });
}


export {errorHandling}