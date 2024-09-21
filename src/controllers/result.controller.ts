import { Request, Response } from "express";

export function getResults(req: Request, res: Response): Response {
  return res.json({ message: "" });
}