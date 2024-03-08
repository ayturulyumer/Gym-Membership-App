const router = require("express").Router();

const membersManager = require("../managers/membersManager.js");

router.get("/", async (req, res) => {
  try {
    const members = await membersManager.getAll().lean();
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await membersManager.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
