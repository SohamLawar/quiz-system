import { Router } from "express";
import { createQuiz, getQuiz } from "../controllers/quiz.controller";

class QuizRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", createQuiz);
    this.router.get("/:id", getQuiz);
  }
}

export default new QuizRoutes().router;