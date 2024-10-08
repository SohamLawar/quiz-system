import { Router } from "express";
import { submitAnswer } from "../controllers/answer.controller";

class AnswerRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", submitAnswer);
  }
}

export default new AnswerRoutes().router;