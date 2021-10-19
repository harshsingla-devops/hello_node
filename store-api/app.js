require("dotenv").config();
require("express-async-errors");

const express = require("express");
const notFoundMW = require("./middlewares/not-found");
const errorHandlerMW = require("./middlewares/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/routes");

const app = express();

//Middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API Project</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", productRouter);

//product routes

app.use(notFoundMW);
app.use(errorHandlerMW);

const port = process.env.PROT || 3000;

//start App
const start = async (req, res) => {
  try {
    //connectDB
    await connectDB();
    app.listen(port, console.log(`app is listening to port : ${port}..`));
  } catch (err) {
    console.log(err);
  }
};

start();
