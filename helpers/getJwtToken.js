const jwt = require("jsonwebtoken");

const getJwtToken = (userId) => {
  // return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expressIn: '1 day' })
  return jwt.sign({ userId: userId }, "process.env.JWT_SECRET");
};

module.exports = getJwtToken;
