
const jwt = require("jsonwebtoken");

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "secretkey");

      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      console.log("USER ROLE:", decoded.role);
console.log("ALLOWED:", allowedRoles);

      next();

    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
