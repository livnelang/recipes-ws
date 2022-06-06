import { model, Schema, Types } from "mongoose";
import { Step } from "../messages/recipe";

type RecipeCategory = "Food" | "Drink" | "Deserts";

// Model interface
export interface Recipe extends Document {
  id: string;
  name: string;
  category: RecipeCategory;
  icon: string;
  preperationLength: number;
  description: string;
  ingredients: Types.Array<string>;
  steps: Types.Array<Step>;
}

// Schema
const RecipeSchema = new Schema<Recipe>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  preperationLength: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [], required: true },
});

// Duplicate the ID field.
RecipeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
RecipeSchema.set("toJSON", {
  virtuals: true,
});

// Create a Model.
export const RecipeModel = model<Recipe>("Recipe", RecipeSchema);
