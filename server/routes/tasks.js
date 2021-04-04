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

//get all incompleted tasks for a user
router.get("/:app_user_id/incomplete", async (req, res) => {
  try {
    const { app_user_id } = req.params;
    const all_tasks = await pool.query("SELECT * FROM tasks WHERE app_user_id = $1 AND complete = false", 
    [app_user_id]
    );
    
    res.json(all_tasks.rows);

  } catch (error) {
    console.log(error.message);
  }
});

//get all completed tasks for a user
router.get("/:app_user_id/complete", async (req, res) => {
  try {
    const { app_user_id } = req.params;
    const all_tasks = await pool.query("SELECT * FROM tasks WHERE app_user_id = $1 AND complete = true", 
    [app_user_id]
    );

    res.json(all_tasks.rows);

  } catch (error) {
    console.log(error.message);
  }
});

//get a single task 
router.get("/:id", async (req, res) => {
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

//create task as user
router.post("/create", async (req, res) => {
  try {
    //description: varchar(255), complete: boolean
    const { app_user_id, task_description, complete } = req.body;
    const new_task = await pool.query(
      "INSERT INTO tasks (app_user_id, task_description, complete) VALUES ($1, $2, $3) RETURNING *",
      [app_user_id, task_description, complete]
      );

    if (!!new_task === true) {
      res.json(new_task.rows[0]);
    } else {
      res.json("Failed to create task");
    }

  } catch (error) {
    console.log(error.message);
  }
});

//update task as user that owns task
router.put("/:app_user_id/:task_id", async (req, res) => {
  try {
    //description: varchar(255), complete: boolean
    const { task_description, complete } = req.body;
    const { app_user_id, task_id } = req.params;
    const update_task = await pool.query(
      "UPDATE tasks SET task_description = $1, complete = $2 WHERE task_id = $3 AND app_user_id = $4 RETURNING *",
      [task_description, complete, task_id, app_user_id]
    );

    if (!!update_task.rows[0] === true) {
      res.json("Task successfully updated");
    } else {
      res.json("Failed to update task");
    }

  } catch (error) {
    console.log(error.message);
  }
});

//delete task as user that owns task
router.delete("/:app_user_id/:task_id", async (req, res) => {
  try {
    const { app_user_id, task_id } = req.params;
    const delete_task = await pool.query(
      "DELETE FROM tasks where task_id = $1 AND app_user_id = $2 RETURNING *",
      [task_id, app_user_id]
    );

    if (!!delete_task.rows[0] === true) {
      res.json("Task successfully deleted");
    } else {
      res.json("Failed to delete task");
    }

  } catch (error) {
    console.log(error.message);
  }
});

//toggle task completion as owner of task 
router.put("/complete/:app_user_id/:task_id", async (req, res) => {
  try {
    const { app_user_id, task_id } = req.params;
    const toggle_complete = await pool.query(
      "UPDATE tasks SET complete = NOT complete WHERE task_id = $1 AND app_user_id = $2 RETURNING *",
      [task_id, app_user_id]
    );
    
    if (!!toggle_complete.rows[0] === true) {
      res.json("Task completion successfully toggled");
    } else {
      res.json("Task failed to toggle");
    }

  } catch (error) {
    console.log(error.message);
  }
});

//get all followed tasks for user
router.get("/:app_user_id/followedtasks", async (req, res) => {
  try {
    const { app_user_id } = req.params;
    const followed_tasks = await pool.query(
      "SELECT * FROM tasks JOIN followedtasks ON tasks.task_id = followedtasks.task_id \
      WHERE followedtasks.app_user_id::text = $1",
      [app_user_id]
    );

    res.json(followed_tasks.rows);

  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;