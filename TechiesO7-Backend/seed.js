const mongoose = require("mongoose");
const faker = require("faker");
const Question = require("./models/Question"); // Assuming your model file is in a 'models' directory

mongoose.connect("mongodb://localhost:/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");

  // Generate random data
  const questionData = Array.from({ length: 10 }, () => ({
    questionName: faker.lorem.sentence(),
    questionUrl: faker.internet.url(),
    category: faker.random.arrayElement(["Technology", "Lifestyle", "Politics", "Food", "Economics", "Sports"]),
    createdAt: faker.date.between("2022-01-01", "2022-05-31"),
    user: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
    },
  }));

  // Insert data into MongoDB
  Question.insertMany(questionData)
    .then(() => {
      console.log("Data inserted successfully");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
      mongoose.connection.close();
    });
});
