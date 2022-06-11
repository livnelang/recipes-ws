import { RecipeCreateParams, Step } from "../messages/recipe";
import { Recipe, RecipeModel } from "../models/Recipe";
import cloudinaryConnection from "../configs/cloudinary";
import { UploadApiResponse } from "cloudinary";

async function uploadBase64ImageToCloudinary(
  base64Image: string
): Promise<UploadApiResponse> {
  return cloudinaryConnection.uploader.upload(base64Image);
}

async function buildStepsArrayWithUploadedImages(
  base64Steps: Step[]
): Promise<Step[]> {
  const stepsWithImageUri: Step[] = [];
  for (const step of base64Steps) {
    const stepImagesUri: string[] = [];
    for (const base64Image of step.images) {
      const uploadApiResponse = await uploadBase64ImageToCloudinary(
        base64Image
      );
      stepImagesUri.push(uploadApiResponse.url);
    }
    stepsWithImageUri.push({
      text: step.text,
      images: stepImagesUri,
    });
  }
  return stepsWithImageUri;
}

export async function createRecipe(
  params: RecipeCreateParams
): Promise<Recipe> {
  console.log(params);
  const coverUploadApiResponse = await uploadBase64ImageToCloudinary(
    params.detailsForm.coverPhoto
  );

  const stepsWithImageUri = await buildStepsArrayWithUploadedImages(
    params.stepsForm.steps
  );

  const recipe = new RecipeModel({
    name: params.detailsForm.name,
    description: params.detailsForm.description,
    category: "Food",
    icon: coverUploadApiResponse.url,
    preperationLength: params.detailsForm.preperationLength,
    ingredients: params.stepsForm.ingredients,
    steps: stepsWithImageUri,
  });

  return recipe.save();
}
