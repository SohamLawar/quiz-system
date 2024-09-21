import { Application } from "express";
import quizRoutes from "./quiz.routes";
import answerRoutes from "./answer.routes";
import resultRoutes from "./result.routes";

export default class Routes {
  // add authorization middleware - jwt token
  constructor(app: Application) {
    app.use("/api/quizzes", quizRoutes);
    app.use("/api/answers", answerRoutes);
    app.use("/api/results", resultRoutes);
  }
}