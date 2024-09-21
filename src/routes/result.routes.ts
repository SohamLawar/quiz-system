import { Router } from "express";
import { getResults } from "../controllers/result.controller";

class ResultRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/quizzes/:quizId", getResults);
  }
}

export default new ResultRoutes().router;