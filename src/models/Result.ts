interface Result {
    quizId: number; // ID of the quiz
    userId: number; // ID of the user
    score: number; // User's score
    answers: Answer[]; // List of answers provided by the user
  }
  