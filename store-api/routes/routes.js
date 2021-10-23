const express = require("express");
const cors = require("cors");

//configuring CORS
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
