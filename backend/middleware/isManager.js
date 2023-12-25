const isManager = async (req, res, next) => {
  try {
    const { isManager } = req.user;
    if (isManager) {
      next();
    } else {
      res.status(403).send({ success: false, message: "Access denied" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = isManager;
