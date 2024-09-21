interface Question {
    id: number; // Unique identifier for the question
    text: string; // The question text
    options: string[]; // List of answer options
    correctOption: number; // Index of the correct answer
  }
  