const jwt = require("../lib/jwt.js");
const secretKey = process.env.SECRET_KEY;

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  next();
};
