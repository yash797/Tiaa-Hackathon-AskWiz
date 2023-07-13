const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: String,
  imageUrl: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  upvotes : {
    type : Number,
    default : 0,
  },
  downvotes :{
    type : Number,
    default : 0,
  },
  upvoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
