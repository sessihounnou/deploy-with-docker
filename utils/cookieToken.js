const getJwtToken = require("../helpers/getJwtToken");
const jwt = require("jsonwebtoken");

const cookieToken = (user, res) => {
  const token = getJwtToken(user.id);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };
  user.password = undefined;
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

const authenticateToken = (req, res, next) => {
  console.log("am here");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, "process.env.JWT_SECRET", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    console.log(token);
    next();
  });
};
module.exports = { cookieToken, authenticateToken };
