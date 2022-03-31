import Express from "express";
import { Paginate, Match, Index, Lambda, Let, Get, Var, Select, query } from "faunadb";
import {faunaClient} from "../configs/faunaDB";

const recipesRouter = Express.Router();

recipesRouter.get("/", async (req: Express.Request, response: Express.Response) => {
  const allRecipes = await faunaClient.query(
    query.Map(
      Paginate(Match(Index("all_recipes"))),
      Lambda(
        "recipeRef",
        Let(
          {
            recipeDoc: Get(Var("recipeRef")),
          },
          {
            id: Select(["ref", "id"], Var("recipeDoc")),
            name: Select(["data", "name"], Var("recipeDoc")),
            category: Select(["data", "category"], Var("recipeDoc")),
            preperationLength: Select(
              ["data", "preperationLength"],
              Var("recipeDoc")
            ),
            description: Select(["data", "description"], Var("recipeDoc"), ""),
            ingredients: Select(["data", "ingredients"], Var("recipeDoc"), []),
            steps: Select(["data", "steps"], Var("recipeDoc"), []),
            icon: Select(["data", "icon"], Var("recipeDoc")),
          }
        )
      )
    )
  );

  response.send(allRecipes);
});

export default recipesRouter;
