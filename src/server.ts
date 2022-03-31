import cors = require('cors');
import 'dotenv/config';
import  { Application} from "express";
import express = require("express");
import routes from './routes/routes';

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Addong routes
app.use(routes);

app.listen(process.env.PORT || 5000, (): void => {
  console.log(`Connected successfully on port ${process.env.PORT}`);
});
