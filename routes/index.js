const router = require("express").Router();
const { userAuth, checkRole,checkToken, serializeUser } = require("../Controllers/auth");
const { ROLE } = require("../config/roles");
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("Api running...");
});
// Authentication Router Middleware
router.use("/auth", require("./auth"));

// Admin Protected Route
router.use("/admin", userAuth, checkRole([ROLE.admin]), require("./admin"));
router.use("/product", require("./product"));
router.use("/order", require("./order"));

// Users Protected Route
router.get("/profile", userAuth, checkToken(), checkRole([ROLE.user]), async (req, res) => {
  res.status(200).json({ type: ROLE.user, user: serializeUser(req.user) });
});

module.exports = router;
