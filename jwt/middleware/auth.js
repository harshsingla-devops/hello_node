const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authenticationMW = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(
      "Token must be provided to access the resource",
      401
    );
  }

  const tokenInRequest = authHeader.split(" ")[1];
  try {
    const decodeToken = jwt.verify(tokenInRequest, process.env.JWT_SECRET_KEY);
    const { id, username } = decodeToken;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new CustomAPIError("No Token Provided", 401);
  }
};

module.exports = authenticationMW;
