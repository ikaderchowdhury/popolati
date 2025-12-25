import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import apiRoutes from "./src/routes/app.route";
import errorHandler from "./src/middleware/errorHandler";
const { mongoSetup } = require("./src/mongo/mongo");

mongoSetup();
var cors = require("cors");
const app = express();

dotenv.config();
// require("./src/config/sequelize");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", apiRoutes);
app.use(errorHandler);

module.exports = app;
