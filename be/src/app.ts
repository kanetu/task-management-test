import createError from "http-errors";
import express from "express";
import path from "path"
import cookieParser from "cookie-parser";
import logger from "morgan"
import cors from "cors";
import routes from "./routes";
import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017/task-management";
const client = new MongoClient(connectionString);

const app = express();


const corsOptions = {
  origin: "*",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

// inject dbclient to request
app.use(function (req, res, next) {
  req.dbClient = client;
  next();
});

app.use("/v1", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


export { app }