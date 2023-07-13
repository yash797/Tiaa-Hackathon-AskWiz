const express = require("express");
const router = express.Router();
const answerDB = require("../models/Answer");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        commentId: req.body.commentId,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});

router.post('/upvote/:id', async (req, res, next) => {
  try {
    const answerId = mongoose.Types.ObjectId(req.params.id);
    const answer = await answerDB.findById(answerId);

    if (answer) {
      // const userId = req.user._id; // assuming you have the authenticated user's ID in req.user (pass from the frontend)
      const token = req.headers.authorization.split(' ')[1]; // get the token from the Authorization header
      const decodedToken = jwt.verify(token, 'awfmoapwmf'); // decode the token using your secret key
      const userId = decodedToken._id; 

      // const userId = "645667521d229aa53fc354c7"; // assuming you have the authenticated user's ID in req.user
      
      // If user has already upvoted this answer, remove their upvote
      console.log("UserId:",decodedToken)

      if (answer.upvoters.includes(userId)) {
        const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
          $inc: { upvotes: -1 },
          $pull: { upvoters: userId }
        }, { new: true });
        return res.json(updatedAnswer);
      }
      
      // If user has already downvoted this answer, remove their downvote and upvote instead
      if (answer.downvoters.includes(userId)) {
        const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
          $inc: { downvotes: -1, upvotes: 1 },
          $pull: { downvoters: userId },
          $push: { upvoters: userId }
        }, { new: true });
        return res.json(updatedAnswer);
      }

      // Otherwise, add the user's upvote to the answer
      const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
        $inc: { upvotes: 1 },
        $push: { upvoters: userId }
      }, { new: true });

      res.json(updatedAnswer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/downvote/:id', async (req, res, next) => {
  try {
    const answerId = mongoose.Types.ObjectId(req.params.id);
    const answer = await answerDB.findById(answerId);

    if (answer) {
      const token = req.headers.authorization.split(' ')[1]; // get the token from the Authorization header
      const decodedToken = jwt.verify(token, 'awfmoapwmf'); // decode the token using your secret key
      const userId = decodedToken._id; 

      // const userId = "645667521d229aa53fc354c7"; // assuming you have the authenticated user's ID in req.user

      // If user has already downvoted this answer, remove their downvote
      if (answer.downvoters.includes(userId)) {
        const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
          $inc: { downvotes: -1 },
          $pull: { downvoters: userId }
        }, { new: true });
        return res.json(updatedAnswer);
      }

      // If user has already upvoted this answer, remove their upvote and downvote instead
      if (answer.upvoters.includes(userId)) {
        const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
          $inc: { upvotes: -1, downvotes: 1 },
          $pull: { upvoters: userId },
          $push: { downvoters: userId }
        }, { new: true });
        return res.json(updatedAnswer);
      }

      // Otherwise, add the user's downvote to the answer
      const updatedAnswer = await answerDB.findByIdAndUpdate(req.params.id, {
        $inc: { downvotes: 1 },
        $push: { downvoters: userId }
      }, { new: true });

      res.json(updatedAnswer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
