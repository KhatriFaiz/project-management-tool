function handleUnauthorizedAccess(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized access" });
  }
  return next();
}

module.exports.handleUnauthorizedAccess = handleUnauthorizedAccess;
