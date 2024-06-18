const { verifyToken } = require("../utils/jwtUtils");

const required = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: true,
      message: "Authorization header ('Bearer token') not found",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Authorization token is missing",
    });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: true,
        message: "JWT token has expired",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: true,
        message: "Invalid JWT token",
      });
    }
    return res.status(401).json({
      error: true,
      message: "Authorization header is malformed",
    });
  }
};

const optional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Authorization header is malformed",
      });
    } else {
      try {
        const user = verifyToken(token);
        req.user = user;
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            error: true,
            message: "JWT token has expired",
          });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            error: true,
            message: "Invalid JWT token",
          });
        } else {
          return res.status(401).json({
            error: true,
            message: "Authorization header is malformed",
          });
        }
      }
    }
  }
  next();
};

module.exports = { required, optional };
