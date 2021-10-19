const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbhits: products.length });
};

const getAllProducts = async (req, res) => {
  //Destructuring the Query Object
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  //Preparing the Query Object
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  //numericFilters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEX = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      //console.log(`${field}...${operator}...${value}`);
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    //console.log(queryObject);
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);

  //Sorting the results
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //SELECTing the fields in the results
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //LIMITing and adding PAGEination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  //AWAITing for the final result
  const products = await result;
  res.status(200).json({ nbhits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
