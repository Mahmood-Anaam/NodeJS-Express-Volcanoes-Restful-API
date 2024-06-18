const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (email) => {
  return jwt.sign({ email }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  verifyToken
};
