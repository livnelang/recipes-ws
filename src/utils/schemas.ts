const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    Step: {
      type: "object",
      properties: {
        text: { type: "string" },
        images: { type: "array", items: { type: "string" } },
      },
      required: ["text", "images"],
      additionalProperties: false,
      $id: "Step",
    },
    UploadRecipeDetailsForm: {
      type: "object",
      properties: {
        coverPhoto: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        preperationLength: { type: "number" },
      },
      required: ["coverPhoto", "name", "description", "preperationLength"],
      additionalProperties: false,
      $id: "UploadRecipeDetailsForm",
    },
    UploadRecipeStepsForm: {
      type: "object",
      properties: {
        ingredients: { type: "array", items: { type: "string" } },
        steps: { type: "array", items: { $ref: "Step" } },
      },
      required: ["ingredients", "steps"],
      additionalProperties: false,
      $id: "UploadRecipeStepsForm",
    },
    RecipeCreateParams: {
      type: "object",
      properties: {
        detailsForm: { $ref: "UploadRecipeDetailsForm" },
        stepsForm: { $ref: "UploadRecipeStepsForm" },
      },
      required: ["detailsForm", "stepsForm"],
      additionalProperties: false,
      $id: "RecipeCreateParams",
    },
  },
} as const;
export default schema.definitions;
