const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};
