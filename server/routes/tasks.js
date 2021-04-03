const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all tasks -- not required feature, but used for testing
router.get("/all", async (req, res) => {
  try {
    const all_tasks = await pool.query("SELECT * FROM tasks");
    res.json(all_tasks.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;