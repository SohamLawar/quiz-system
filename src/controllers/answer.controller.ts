import { Request, Response } from "express";

export function submitAnswer(req: Request, res: Response): Response {
  return res.json({ message: "" });
}