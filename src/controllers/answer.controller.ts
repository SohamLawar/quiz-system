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
let results: Result[] = [];
// assume userId for now, this is expected to come from after we decode JWT token information
const userId: number = 1;
// Request body should contain quizId, questionId, selectedOption
// add input validation layer
export function submitAnswer(req: Request, res: Response): Response {
  try {
    // retrieve userId from authorization middleware
    const { quizId, questionId, selectedOption } = req.body;

    // Find the quiz
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Find the question within the quiz
    const question = quiz.questions.find(q => q.id === parseInt(questionId));
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Find or create the quiz result for the user
    const quizResult = results.find(r => r.quizId === parseInt(quizId) && r.userId === userId);

    // Check if the question has already been answered
    const quizAnswered = quizResult?.answers.find(a => a.questionId === parseInt(questionId));
    if (quizAnswered) {
      return res.status(400).json({ message: "Question is already answered" });
    }

    // Check if the answer is correct
    const isCorrect = question.correctOption === selectedOption;

    if (quizResult) {
      // Update the existing quiz result
      quizResult.score = isCorrect ? ++quizResult.score : quizResult.score;
      quizResult.answers.push({
        questionId: parseInt(questionId),
        selectedOption,
        isCorrect
      });
    } else {
      // Create a new result for the user and quiz
      let result: Result = {
        userId: userId,
        quizId: parseInt(quizId),
        score: isCorrect ? 1 : 0,
        answers: [{
          questionId: parseInt(questionId),
          selectedOption,
          isCorrect
        }]
      };
      results.push(result); // Push the new result to the results array
    }

    // Return the result with feedback
    return res.status(200).json({
      questionId: question.id,
      selectedOption: selectedOption,
      isCorrect: isCorrect,
      correctOption: !isCorrect ? question.correctOption : undefined // Only return the correct answer if the answer was wrong
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}