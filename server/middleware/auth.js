const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ status: false, message: "No token, authorization denied." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // set user id to req
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: "Invalid token." });
  }
}

module.exports = authMiddleware;
