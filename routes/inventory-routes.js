const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("this is the root path for /inventory ");
});

module.exports = router;
