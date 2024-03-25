const router = require("express").Router();

const adminController = require("./controllers/adminController.js");
const membersController = require("./controllers/membersController.js");

router.use("/admin", adminController);
router.use("/members", membersController);

module.exports = router;

