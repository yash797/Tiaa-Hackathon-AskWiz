const mongoose = require("mongoose");

const url =
  "mongodb+srv://piyushbonde06:techiesO7@cluster0.1zrbsvh.mongodb.net/quora?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
