import Express from "express";
import { ajvMiddleware } from "../middlewares/ajv";
import { Recipe, RecipeModel } from "../models/Recipe";

const recipesRouter = Express.Router();
recipesRouter.get("/", async (req: Express.Request, response: Express.Response) => {
  const allRecipes: Recipe[] = await RecipeModel.find();
  response.status(200).json(allRecipes);
});

recipesRouter.post("/", ajvMiddleware("RecipeCreateParams"),  (req: Express.Request, response: Express.Response) => {
  console.log(req);
});

recipesRouter.get("/www", ajvMiddleware("HelloWorld"), (req: Express.Request, response: Express.Response) => {
  console.log(req);
});

export default recipesRouter;
