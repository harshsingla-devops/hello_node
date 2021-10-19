const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please enter a username and password", 400);
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: username, token });

  //res.send("Fake Login/Signup");
};
const dashboard = async (req, res) => {
  const secretNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data : ${secretNumber}`,
  });
};

module.exports = { login, dashboard };
