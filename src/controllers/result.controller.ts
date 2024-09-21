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
const userId: number = 1;
let sampleResult: Result = {
  "quizId": 1,
  "userId": userId,
  "score": 1,
  "answers": [
    {
      "questionId": 1,
      "selectedOption": 1,
      "isCorrect": true
    },
    {
      "questionId": 2,
      "selectedOption": 2,
      "isCorrect": false
    }
  ]
}
let results: Result[] = [];
results.push(sampleResult);
export function getResults(req: Request, res: Response): Response {
  try {
    const quizId: number = parseInt(req.params.quizId, 10);
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const quizResult = results.find(r => r.quizId === quizId && r.userId === userId);
    if (!quizResult) {
      return res.status(404).json({ message: "Result not found" });
    }
    const totalSubmitted: number = quizResult.answers.length;
    const totalQuestions: number = quiz.questions.length;
    let correctlyAnswered = quizResult.answers.filter(a => a.isCorrect).length;
    return res.status(200).json({
      quizId,
      score: quizResult.score,
      totalQuestions,
      totalSubmitted,
      correctlyAnswered,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}