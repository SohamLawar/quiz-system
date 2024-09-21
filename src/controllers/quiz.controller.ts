import { Request, Response } from "express";

export function createQuiz(req: Request, res: Response): Response {
  return res.json({ message: "" });
}

export function getQuiz(req: Request, res: Response): Response {
    return res.json({ message: "" });
}