import "dotenv/config";
import "express-async-errors";
import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>API TEST</h1>");
});

const port = process.env.PORT || 3000;
const start = () => {
  app.listen(port, () => console.log(`server is running at port: ${port}`));
};

start();
