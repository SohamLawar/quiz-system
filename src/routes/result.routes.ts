import { Router } from "express";
import { getResults } from "../controllers/result.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", getResults);
  }
}

export default new HomeRoutes().router;