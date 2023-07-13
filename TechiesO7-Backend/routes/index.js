const express = require("express");
const router = express.Router();

const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRoute = require("./Comments")
const userRouter = require("./userRoutes");
const authRouter = require("./authRoute");


router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/comments", commentRoute);
router.use('/user',userRouter);
router.use("/auth",authRouter);


router.get("/", (req, res) => {
  
  res.send("This api is reserved for quora clone");
}); 


module.exports = router;
