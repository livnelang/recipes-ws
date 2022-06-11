import Express from "express";
import { createRecipe } from "../controllers/recipesCtrl";
import { ajvMiddleware } from "../middlewares/ajv";
import { Recipe, RecipeModel } from "../models/Recipe";

const recipesRouter = Express.Router();
recipesRouter.get(
  "/",
  async (req: Express.Request, response: Express.Response) => {
    const allRecipes: Recipe[] = await RecipeModel.find();
    response.status(200).json(allRecipes);
  }
);

recipesRouter.post(
  "/",
  ajvMiddleware("RecipeCreateParams"),
  async (req: Express.Request, response: Express.Response) => {
    const uploadedRecipe: Recipe = await createRecipe(req.body);
    console.log("after create recipe");
    return response.status(200).json(uploadedRecipe);
  }
);

recipesRouter.get(
  "/www",
  ajvMiddleware("Step"),
  (req: Express.Request, response: Express.Response) => {
    console.log(req);
  }
);

export default recipesRouter;
