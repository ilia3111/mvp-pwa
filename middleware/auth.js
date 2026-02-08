const jwt = require("jsonwebtoken");

module.exports = function (role = null) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role)
        return res.status(403).json({ error: "Access denied" });

      req.admin = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
