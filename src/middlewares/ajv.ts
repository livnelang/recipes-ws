import { NextFunction } from "express";
import Express from "express";
import Ajv from "ajv";
import schemas from "../utils/schemas";
type SchemaValidationName = keyof typeof schemas;

export const ajvMiddleware =
  (schemaName: SchemaValidationName) =>
  (req: Express.Request, res: Express.Response, next: NextFunction) => {
    const allSchemas: any = schemas;
    const requiredSchema: Object | undefined = allSchemas[schemaName];
    if (requiredSchema === undefined) {
      throw Error("Could not find schema: " + schemaName);
    }

    const ajv = new Ajv({ allErrors: true, schemas: allSchemas });

    const validate = ajv.compile(requiredSchema);
    const isValid = validate(req.body);
    if (!isValid && req.method !== "GET") {
      return res.status(400).json(validate.errors);
    }
    next();
  };
