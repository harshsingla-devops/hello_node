const mongoose = require("mongoose");
const DB = process.env.MONGO_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDB = () => {
  return mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
