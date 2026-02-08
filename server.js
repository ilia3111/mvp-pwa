require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/settings", require("./routes/settings"));

app.listen(process.env.PORT, () =>
  console.log("✅ Backend running")
);
