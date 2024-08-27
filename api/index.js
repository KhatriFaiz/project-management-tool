const express = require("express");
const projectRouter = require("./routes/projects.route");
const userRouter = require("./routes/users.route");
const { default: mongoose } = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/project_management");

app.use("/api/projects", projectRouter);
app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log("App is running at http://localhost:3000/");
});
