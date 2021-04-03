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

//create task
router.post("/create", async (req, res) => {
  try {

    //description: varchar(255), complete: boolean
    const { task_description, complete } = req.body;
    const new_task = await pool.query(
      "INSERT INTO tasks (task_description, complete) VALUES ($1, $2) returning * ",
      [task_description, complete]
      );

    //respond with newly created task
    res.json(new_task.row[0]);

  } catch (error) {
    console.log(error.message);
  }
});

//delete task
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delete_task = pool.query(
      "DELETE FROM tasks where task_id = ($1)",
      [id]
    );

    res.json("Task successfully deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;