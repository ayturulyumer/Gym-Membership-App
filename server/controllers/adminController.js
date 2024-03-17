const router = require("express").Router();

const adminManager = require("../managers/adminManager.js");

router.post("/login", async (req, res) => {
  try {
    const result = await adminManager.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out" });
});

module.exports = router;
