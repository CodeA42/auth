const router = require("express").Router();

router.post("/register", require("./register"));
router.post("/login", require("./login"));
router.post("/refresh", require("./refresh"));

router.use("*", (req, res) => {
  res.status(404).json("Invalid request");
});

module.exports = router;
