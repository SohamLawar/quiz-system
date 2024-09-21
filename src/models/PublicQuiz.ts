interface PublicQuiz {
    id: number; // Unique identifier for the quiz
    title: string; // Title of the quiz
    questions: PublicQuestion[]; // List of questions
  }
  