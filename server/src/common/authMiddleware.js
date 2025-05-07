const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  //   const token = req.signedCookies[process.env.COOKIE_NAME];
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
