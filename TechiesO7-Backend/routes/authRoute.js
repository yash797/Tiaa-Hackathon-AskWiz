const express = require("express");
const router = express.Router()
const { signout, signup, signin } = require("../controllers/authController");
const { check, validationResult } = require("express-validator");

router.post(
    "/signup",
    [
      check("Name", "Name Should be atleast 3 char").isLength({ min: 3 }),
      check("email", "Email is Required").isEmail(),
      check("password", "Password should be at least 3 char").isLength({
        min: 3,
      }),
    ],
    signup
  );
  
router.post(
    "/signin",
    [
      check("email", "Email is Required").isEmail(),
      check("password", "Password field is required").isLength({
        min: 3,
      }),
    ],
    signin
  );
  
router.get("/signout", signout);
  
module.exports = router;