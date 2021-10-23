require("dotenv").config();
const connectDB = require("./db/connect");
//const Product = require("./models/product");
const blogPost = require("./models/blog");
const jsonProducts = require("./products.json");
//const jsonBlogPosts = require("./blog.json");

const start = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.create(jsonProducts);
    //await blogPost.deleteMany();
    //await blogPost.create(jsonBlogPosts);
    console.log("success!!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
