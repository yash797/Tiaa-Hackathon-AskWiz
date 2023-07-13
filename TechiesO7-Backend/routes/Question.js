const express = require("express");
const router = express.Router();
const answerDB = require("../models/Answer");
const questionDB = require("../models/Question");

router.get("/count", async(req,res)=>{
  try{
  const email = req.body.email;
  const cnt = await  questionDB.countDocuments({
    "user.email": email
  })

  res.status(200).send({count:cnt});
}
   catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get("/questionList", async(req,res)=>{
  try{
    // questionDB.find({questionName})
    const ques = await questionDB.find({}, { questionName: 1, _id: 0 })

    console.log("ques:",ques);
    res.status(200).send({ques});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})


router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        category: req.body.category,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await questionDB.find();
    const postIds = posts.map(post => post._id);
    const answers = await answerDB.find({ questionId: { $in: postIds } }).populate('questionId');
    console.log("answers':",answers);
   
   
    let answersByQuestionId = answers.reduce((acc, answer) => {
      if (!acc[answer.questionId._id]) {
        acc[answer.questionId._id] = [];
      }
      acc[answer.questionId._id].push(answer);
    
      return acc;
    }, {});
    
    for(let question in answersByQuestionId) {
      answersByQuestionId[question].sort((a,b)=>b.upvotes-a.upvotes)      
    }

    console.log("ans:",answersByQuestionId)

    const postsWithAnswers = posts.map(post => ({
      ...post.toObject(),
      answers: answersByQuestionId[post._id] || []
    }));

    res.status(200).json({ success: true, data: postsWithAnswers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;
