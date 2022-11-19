const router = require("express").Router();
const {
  getSignup,
  getSignin,
  postSignin,
  postSignup,
} = require("../controller/loggerController");
router.get("/signup", getSignup);
router.get("/signin", getSignin);
router.post("/signin", postSignin);
router.post("/signup", postSignup);

module.exports = router;
