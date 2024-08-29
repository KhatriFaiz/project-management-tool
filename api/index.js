const express = require("express");
const projectRouter = require("./routes/projects.route");
const userRouter = require("./routes/users.route");
const authRouter = require("./routes/auth.route");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const { configurePassport } = require("./config/passport");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/project_management");

app.use(express.json());

app.use(
  session({
    secret: "somethingtopsecret",
    store: new MongoStore({
      client: mongoose.connection.getClient(),
    }),
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600 * 24,
    },
  })
);
app.use(passport.session());

configurePassport();

app.use("/api/projects", projectRouter);
app.use("/api/users", userRouter);
app.use("/auth/", authRouter);

app.listen(3000, () => {
  console.log("App is running at http://localhost:3000/");
});
