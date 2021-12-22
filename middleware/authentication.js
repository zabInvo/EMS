const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.checkAuth = async (req, res, next) => {
  try {
    if (req.headers.token) {
      const verify = await jwt.verify(
        req.headers.token,
        process.env.private_key,
        function (err, decoded) {
          if (decoded) {
            req.user = decoded.id;
            next();
          } else {
            res.status(401).json({ message: "Unauthenticated" });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Unauthenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error  " });
  }
};
