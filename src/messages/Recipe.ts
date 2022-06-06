export interface Step {
  text: string;
  images?: string[];
}

export interface UploadRecipeDetailsForm {
  coverPhoto: string | null;
  name: string;
  description: string;
  preperationLength: number;
}

export interface UploadRecipeStepsForm {
  ingredients: string[];
  steps: Step[];
}

export interface RecipeCreateParams {
  detailsForm: UploadRecipeDetailsForm;
  stepsForm: UploadRecipeStepsForm;
}
