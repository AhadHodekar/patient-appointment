import "dotenv/config";
import "express-async-errors";
import express from "express";
import { StatusCodes } from "http-status-codes";
import connectDB from "./db/connect.js";

const app = express();

//middlewares
app.use(express.json());

import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import notFoundMiddleware from "./middlewares/notFound.js";
import apiRoutes from "./routes/apiRoutes.js";

//routes
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>API TEST</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    connectDB();
    app.listen(port, () =>
      console.log(`server is running at port: ${port}...`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
