const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  db.get("SELECT * FROM notice WHERE id = 1", (e, row) => res.json(row));
});

router.post("/", auth(), (req, res) => {
  const { text, active } = req.body;
  db.run(
    "INSERT OR REPLACE INTO notice (id, text, active) VALUES (1,?,?)",
    [text, active]
  );
  res.json({ success: true });
});

module.exports = router;
