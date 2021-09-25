const router = require("express").Router();

router.post("/register", require("./register"));
router.post("/login", require("./login"));

router.use("*", (req, res) => {
  res.status(404).json("Invalid request");
});

module.exports = router;
