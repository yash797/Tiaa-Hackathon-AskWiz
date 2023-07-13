// Import required packages and models
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Question');

// Create an instance of the express application
const app = express();

// Use the body-parser middleware to parse JSON data in requests
app.use(bodyParser.json());

// Define a route for creating new posts
app.post('/posts', (req, res, next) => {
  const postText = req.body.text;

  // Check if the post text is longer than 2000 characters
  if (postText.length > 2000) {
    return res.status(400).json({ error: 'Post text exceeds 2000 characters limit' });
  }

  // Create a new Post document and save it to the database
  const post = new Post({
    text: postText
  });

  post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully',
        post: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port {{process.env.PORT}}`);
});
