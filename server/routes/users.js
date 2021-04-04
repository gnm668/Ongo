const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all users -- not required feature, but used for testing
router.get("/", async (req, res) => {
  try {
    const all_users = await pool.query("SELECT * FROM users");
    res.json(all_users.rows);

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;