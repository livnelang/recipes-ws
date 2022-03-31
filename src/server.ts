import cors = require('cors');
import 'dotenv/config';
import  { Application} from "express";
import express = require("express");
import routes from './routes/routes';

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8080'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));


// Addong routes
app.use(routes);

app.listen(process.env.PORT || 5000, (): void => {
  console.log(`Connected successfully on port ${process.env.PORT}`);
});
