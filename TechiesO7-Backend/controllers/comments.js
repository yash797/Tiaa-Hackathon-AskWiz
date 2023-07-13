const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createComment = async (req, res) => {
  try {
    const { text, postId, taggedUsernames } = req.body;

    const taggedUserIds = await User.find({ username: { $in: taggedUsernames } }, '_id');

    const comment = new Comment({
      text,
      post: postId,
      tags: taggedUserIds
    });

    const savedComment = await comment.save();

    res.status(201).json({ comment: savedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
