const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const follows = require("./routes/follows");

app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/follows", follows);

app.listen(port, () => console.log(`Server is running on port ${port}`));