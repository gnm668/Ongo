const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/:app_user_id/create", async (req, res) => {
  try {
    
    //I'm making the assumption that we are getting the task id from state of the component on the frontend
    //presumably we would want the frontend to rerender upon following a task to toggle between a follow 
    //and unfollow button, the way that this endpoint is built should work for the front-end to update 
    //whichever state management they decide to use i.e. Redux, etc. 

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
      res.json("Failed to follow task");
    }

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;