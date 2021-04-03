const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all users -- not required feature, but used for testing
router.get("/", async (req, res) => {
  try {
    const all_tasks = await pool.query("SELECT * FROM users");
    res.json(all_tasks.rows);

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;