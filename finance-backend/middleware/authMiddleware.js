


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

      // ✅ FIXED: use decoded instead of user
      if (decoded.status === "inactive") {
        return res.status(403).json({
          message: "User account is inactive",
        });
      }

      // ✅ role check
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      console.log("USER ROLE:", decoded.role);
      console.log("ALLOWED:", allowedRoles);

      next();

    } catch (error) {
      console.error("JWT ERROR:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};