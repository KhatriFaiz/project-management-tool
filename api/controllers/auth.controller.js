async function loginUserWithLocal(req, res) {
  res.send({
    success: true,
    message: "login successful",
  });
}

module.exports.loginUserWithLocal = loginUserWithLocal;
