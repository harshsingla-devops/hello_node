const dotenv = require("dotenv");
dotenv.config({ path: "./my.env" });
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMW = require("./middleware/error-handler");

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//routes
//get all items
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMW);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`App is runnig at port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
