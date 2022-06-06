/**
 * Generating schemas from typescript interfaces
 * we use ts-json-schema-generator,
 * iterating all schemas, adding them their name ids and remove base uri definitions,
 * after weve got all schema name keys, we can enforce the checked endpoint type, generated to "../utils/schemas" with
 * type SchemaValidationName = keyof typeof schemas;
 */

const { performance } = require("perf_hooks");
const tsj = require("ts-json-schema-generator");
const fs = require("fs");

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
  path: "./src/messages/*.*",
  tsconfig: "./tsconfig.json",
  type: "*", // Or <type-name> if you want to generate schema for that one type only
  expose: "all",
};

console.log("*** Start generating schemas ... *** ");
const startTime = performance.now();

const allSchemas = tsj.createGenerator(config).createSchema(config.type);
Object.keys(allSchemas.definitions).forEach((schemaName) => {
  const updatedSchema = allSchemas.definitions[schemaName];
  updatedSchema.$id = schemaName;
  Object.keys(updatedSchema.properties).forEach((propName) => {
    let updatedProp = updatedSchema.properties[propName];

    let stringifyProp = JSON.stringify(updatedProp);
    stringifyProp = stringifyProp.replace(
      new RegExp("#/definitions/", "g"),
      ""
    );
    updatedProp = JSON.parse(stringifyProp);
    updatedSchema.properties[propName] = updatedProp;
  });
  allSchemas.definitions[schemaName] = updatedSchema;
});

fs.writeFileSync(
  "src/utils/schemas.ts",
  "const schema = " +
    JSON.stringify(allSchemas) +
    " as const;\nexport default schema.definitions;"
);
const endTime = performance.now();
console.log(
  `*** Generating schemas took ${((endTime - startTime) / 1000).toFixed(
    3
  )} seconds ***`
);
