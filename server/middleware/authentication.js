const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Authentication Failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: payload._id };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Authentication Failed");
  }
};

module.exports = { authenticateUser };
