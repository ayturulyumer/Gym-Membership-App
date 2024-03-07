const jwt = require("../lib/jwt.js");
const secretKey = process.env.SECRET_KEY;

exports.auth = (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      res.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({
        message: "You are not authorized!",
      });
    }
  } else {
    next();
  }
};
