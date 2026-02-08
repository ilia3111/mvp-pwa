const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, admin) => {
      if (!admin) return res.status(401).json({ error: "Invalid login" });

      const ok = await bcrypt.compare(password, admin.password);
      if (!ok) return res.status(401).json({ error: "Invalid login" });

      const token = jwt.sign(
        { id: admin.id, username, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
