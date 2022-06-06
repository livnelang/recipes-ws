import cors = require("cors");
import "dotenv/config";
import { Application } from "express";
import express = require("express");
import routes from "./routes/routes";
import connectDB from "./configs/db";

connectDB();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(ajvMiddleware());

app.use(routes);

app.listen(process.env.PORT || 5000, (): void => {
  console.log(`Connected successfully on port ${process.env.PORT || 5000}`);
});
