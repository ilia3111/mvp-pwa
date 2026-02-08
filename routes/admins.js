const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth("super"), async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO admins (username, password, role) VALUES (?,?,?)",
    [username, hash, role],
    err => {
      if (err) return res.status(400).json({ error: "Exists" });
      res.json({ success: true });
    }
  );
});

module.exports = router;
