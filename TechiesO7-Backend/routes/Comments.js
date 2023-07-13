const express = require("express");
const commentModel = require("../models/Comment");
const User = require("../models/User")

const commentRoute = express.Router();

commentRoute.get("/:answerId", async (req, res) => {
  const answerId = req.params.answerId;
  try {
    console.log(answerId);
    const data = await commentModel
      .find({ answerId: answerId })
      .sort({ createdAt: -1 });
    console.log("comet", data);
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


commentRoute.post("/", async (req, res) => {
  try {
    var { comment, username, answerId } = req.body;
    const regex = /@\w+/g;
    const mentionedUsernames = comment.match(regex);
    let mentionedUsers = [];
    console.log("Men:",mentionedUsernames)
    if (mentionedUsernames && mentionedUsernames.length > 0) {
      const newUserName = mentionedUsernames[0].substr(1)
      console.log("Men:",newUserName)

      const users = await User.find({ Name: { $in: newUserName } });
      console.log("Men:",users)
      if (users) {
        // Replace the mentionedUsername with a hyperlink 'a' tag
        comment = comment.replace(mentionedUsernames[0], `<a href='/users/${users[0]._id}'>${mentionedUsernames[0]}</a>`);
      }

      mentionedUsers = users.map(user => user._id);
    } 
    const commentData = {
      comment: comment,
      answerId: answerId,
      username: username,
      mentioned_users: mentionedUsers
      // createdBy: userID // Add the ID of the user who created the comment
    };
    const data = await commentModel.create(commentData);

    // // Get the post author's ID
    // const postData = await post.findOne({ postid: postId });
    // const postAuthorId = postData.user_id;

    // // Add a new notification to the post author's notifications array
    // const notificationData = {
    //   type: 'comment',
    //   postId: postId,
    //   commentId: data._id,
    //   createdBy: userID
    // };
    // await User.updateOne({ _id: postAuthorId }, { $push: { notifications: notificationData } });

    return res.status(200).send(data);

  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = commentRoute;
