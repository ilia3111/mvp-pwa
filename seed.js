const bcrypt = require("bcrypt");
const db = require("./config/db");

(async () => {
  const hash = await bcrypt.hash("ilia13911356", 10);

  db.run(
    "INSERT OR IGNORE INTO admins (username,password,role) VALUES (?,?,?)",
    ["ilia13911356", hash, "super"],
    () => {
      console.log("✅ Super admin created");
    }
  );
})();
