import { randomUUID } from "crypto";
import { Request, Response } from "express";
let quizzes: Quiz[] = [];
let quizId: number = 0;

export function createQuiz(req: Request, res: Response): Response {
  try {
    // add input validation layer
    // implement service layer
    // add logging
    // add swagger documentation
    let newQuiz: Quiz = {
      id: ++quizId,
      title: req.body.title,
      questions: req.body.questions
    };
    quizzes.push(newQuiz);
    return res.status(201).json({
      message: "create OK",
      reqBody: req.body
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}

export function getQuiz(req: Request, res: Response): Response {
  try {
    // console.log(req.params.id);
    // console.log(quizzes.length);
    // console.log(quizzes.length && quizzes[0].id);
    const quizIdParam = req.params.id;

    if (!quizIdParam || isNaN(Number(quizIdParam))) {
      return res.status(400).json({
        message: "Invalid quiz ID."
      });
    }

    const quizId: number = parseInt(quizIdParam as string);
    const quiz = quizzes.find(quiz => quiz.id === quizId);

    if (!quiz) {
      return res.status(404).json({
        message: `Quiz with ID ${quizId} not found.`
      });
    }

    // Return the found quiz
    return res.status(200).json(quiz);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}