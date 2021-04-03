const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all tasks -- not required feature, but used for testing
router.get("/", async (req, res) => {
  try {
    const all_tasks = await pool.query("SELECT * FROM tasks");
    res.json(all_tasks.rows);

  } catch (error) {
    console.log(error.message);
  }
});

//get a single task 
const get_single_task = router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query(
      "SELECT * FROM tasks WHERE task_id = $1",
      [id]
    );

    res.json(task.rows[0]);

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
      "INSERT INTO tasks (task_description, complete) VALUES ($1, $2) returning *",
      [task_description, complete]
      );

    //respond with newly created task
    res.json(new_task.row[0]);

  } catch (error) {
    console.log(error.message);
  }
});

//update task
router.put("/:id", async (req, res) => {
  try {
    //description: varchar(255), complete: boolean
    const { task_description, complete } = req.body;
    const { id } = req.params;
    const update_task = pool.query(
      "UPDATE tasks SET task_description = $1, complete = $2 WHERE task_id = $3",
      [task_description, complete, id]
    );

    res.json("Task successfully updated");

  } catch (error) {
    console.log(error.message);
  }
});

//delete task
router.delete("/:id", async (req, res) => {
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

//toggle task completion
router.put("/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const toggle_copmlete = pool.query(
      "UPDATE tasks SET complete = NOT complete WHERE task_id = $1",
      [id]
    );

    res.json("Task completion successfully toggled");

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;