import { Request, Response } from "express";
let quizzes: Quiz[] = [];
let quizId: number = 0;
let newQuiz: Quiz = {
  "id": ++quizId,
  "title": "Math Quiz",
  "questions": [
    {
      "id": 1,
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctOption": 1
    },
    {
      "id": 2,
      "text": "What is 5 * 6?",
      "options": ["30", "25", "35", "40"],
      "correctOption": 0
    }
  ]
};
quizzes.push(newQuiz);

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
    const quizIdParam = req.params.id;

    if (!quizIdParam || isNaN(Number(quizIdParam))) {
      return res.status(400).json({
        message: "Invalid quiz ID."
      });
    }

    const quizId: number = parseInt(quizIdParam as string);
    const quiz = quizzes.find(quiz => quiz.id === quizId);
    const publicQuiz = getPublicQuiz(quiz);
    if (!quiz) {
      return res.status(404).json({
        message: `Quiz with ID ${quizId} not found.`
      });
    }

    // Return the found quiz
    return res.status(200).json(publicQuiz);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}
// this can be added as helper method
export function getPublicQuiz(quiz?: Quiz): PublicQuiz {
  if (!quiz) {
    throw new Error("Quiz not provided");
  }
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions?.map(question => ({
      id: question.id,
      text: question.text,
      options: question.options
    })) || [] // Provide an empty array if questions is undefined
  };
}