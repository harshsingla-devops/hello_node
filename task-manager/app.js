const dotenv = require("dotenv");
dotenv.config({ path: "./my.env" });
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App!");
});

//get all items
app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`App is runnig at port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
