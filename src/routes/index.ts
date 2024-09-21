import { Application } from "express";
import quizRoutes from "./quiz.routes";
import answerRoutes from "./answer.routes";
import resultRoutes from "./result.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/quiz", quizRoutes);
    app.use("/api/answer", answerRoutes);
    app.use("/api/result", resultRoutes);
  }
}