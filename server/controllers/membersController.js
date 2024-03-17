const router = require("express").Router();

const membersManager = require("../managers/membersManager.js");
const { isAuth } = require("../middlewares/authMiddleware.js");

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

router.post("/", isAuth, async (req, res) => {
  try {
    const result = await membersManager.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:memberId", isAuth, async (req, res) => {
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

router.delete("/:memberId", isAuth, async (req, res) => {
  try {
    await membersManager.delete(req.params.memberId);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/:memberId", isAuth, async (req, res) => {
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

router.get("/expiring", async (req, res) => {
  try {
    const expiringMembers = await membersManager.getExpiringMembers();
    res.status(200).json(expiringMembers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get("/expired", async (req, res) => {
  try {
    const expiredMembers = await membersManager.getExpiredMembers();
    res.status(200).json(expiredMembers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get("/remainingWorkouts", async (req, res) => {
  try {
    const sortedMembers = await membersManager.getMembersSortedByWorkouts();
    res.status(200).json(sortedMembers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
