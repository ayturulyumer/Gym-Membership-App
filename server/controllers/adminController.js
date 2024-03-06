const router = require("express").Router();

const adminManager = require("../managers/adminManager.js");


router.post("/login", async (req, res) => {
  try {
    const result = await adminManager.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
