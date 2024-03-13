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

router.put("/:memberId", async (req, res) => {
  try {
    const updatedMember = await membersManager.update(
      req.params.memberId,
      req.body
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:memberId", async (req, res) => {
  try {
    await membersManager.delete(req.params.memberId);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/:memberId", async (req, res) => {
  try {
    const member = await membersManager.decreaseWorkout(req.params.memberId);
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const foundMembers = await membersManager.search(req.query.name);
    if (foundMembers.length === 0) {
      throw new Error("Няма намерени членове");
    }
    res.status(200).json(foundMembers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
