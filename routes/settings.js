const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM settings", (e, rows) => res.json(rows));
});

router.post("/", auth(), (req, res) => {
  const { key, value } = req.body;
  db.run(
    "INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)",
    [key, value]
  );
  res.json({ success: true });
});

module.exports = router;
