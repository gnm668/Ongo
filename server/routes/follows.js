const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/:app_user_id/create", async (req, res) => {
  try {

    //description task_id: int, app_user_id: uuid
    const { app_user_id } = req.params;
    const { task_id } = req.body;
    const new_follow = await pool.query(
      "INSERT INTO followedtasks (task_id, app_user_id) VALUES($1, $2) RETURNING *",
      [task_id, app_user_id]
    );

    if (!!new_follow.rows[0] === true) {
      res.json(new_follow.rows[0]);
    } else {
      res.status(404).send("Failed to follow task");
    }

  } catch (error) {
    res.status(404).send("Failed to follow task");
  }
});

router.delete("/:app_user_id/delete", async (req, res) => {
  try {
    const { app_user_id } = req.params;
    const { task_id } = req.body;
    const delete_follow = await pool.query(
      "DELETE FROM followedtasks where task_id = $1 AND app_user_id = $2 RETURNING *",
      [task_id, app_user_id]
    );

    if (!!delete_follow.rows[0] === true) {
      res.json("Follow successfully deleted");
    } else {
      res.status(404).send("Failed to delete follow");
    }

  } catch (error) {
    res.status(404).send("Failed to delete follow");
  }
});

module.exports = router;