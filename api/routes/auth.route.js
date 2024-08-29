const { Router } = require("express");
const { loginUserWithLocal } = require("../controllers/auth.controller");
const passport = require("passport");

const router = Router();

router.post(
  "/login/password",
  passport.authenticate("local"),
  loginUserWithLocal
);

router.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) console.log(err);
  });
  return res.send();
});

module.exports = router;
