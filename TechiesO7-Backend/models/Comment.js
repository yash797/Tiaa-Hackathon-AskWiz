const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    answerId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    comment: String,
    username: String,
    mentioned_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const comment = mongoose.model("Comment", commentSchema);

module.exports = comment;
