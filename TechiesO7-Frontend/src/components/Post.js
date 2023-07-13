import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  AddComment,
  RepeatOneOutlined,
  ChatBubble,

  ShareOutlined,
} from "@material-ui/icons";
import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import { useEffect } from "react";
// import {AddCommentIcon} from '@mui/icons-material/AddComment'

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
function Post({ post }) {
  console.log("Post:",post.answers)
    
  // const [isLiked, setIsLiked] = useState(false);
  const [likedAnswerId, setLikedAnswerId] = useState(null);
  const [dislikedAnswerId, setDislikedAnswerId] = useState(null);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer for comment reply
  const [answer, setAnswer] = useState("");
  const Close = <CloseIcon />;
  const [expanded, setExpanded]=useState(false);
  const user = useSelector(selectUser);
  const [comment, setComment] = useState({});
  // console.log("Comment:",comment)
  // const handleFavoriteClick = () => {
  //   setIsLiked(!isDisliked);
  // };
  // const handleFavoriteClick = (answerId) => {
  //   if (likedAnswerId === answerId) {
  //     // Unlike the answer
  //     setLikedAnswerId(null);
  //   } else {
  //     // Like the answer
  //     setLikedAnswerId(answerId);
  //   }
  // };
  const handleFavoriteClick = async (answerId) => {

    try {
      if (likedAnswerId === answerId) {
        // Unlike the answer
        await axios.post(`https://techieso7.onrender.com/api/answers/upvote/${answerId}`);
        setLikedAnswerId(null);
      }
      // } else {
      //   // Like the answer
      //   await axios.post(`/api/answers/upvote/${answerId}`);
      //   setLikedAnswerId(answerId);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDownvoteClick = async (answerId) => {
  //   try {
  //     await axios.post(`/answers/downvote/${answerId}`);
  //     setDislikedAnswerId(answerId);

  //     // Handle any other necessary logic
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  

  const handleQuill = (value) => {
    setAnswer(value);
  };
  // console.log(answer);

  const handleCommentReply = (answerId) => {
    setSelectedAnswer(prevAnswerId => prevAnswerId === answerId ? null : answerId);
    
  };
  // const handleCommentReply = (answerId) => {
  //   setSelectedAnswer(answerId);
  // };
  
  const openCommentReply = async (answerId) => {
    await axios.get(`https://techieso7.onrender.com/api/comments/${answerId}`)
    .then((res)=>{

      console.log(res.data);
      setComment(res.data);
    })
    .catch((e)=>{
      console.log(e);
    })
    setSelectedAnswer(answerId);
    setIsModalOpen(true);
  };
  const closeCommentReply = () => {
    setSelectedAnswer(null);
    setIsModalOpen(false);
  };


  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      await axios
        .post("https://techieso7.onrender.com/api/answers", body, config)
        .then((res) => {
          // console.log("Res:",res.data);
          alert("Answer added succesfully");
          setIsModalOpen(false);
          window.location.href = "/";
          
        })
        .catch((e) => {
          console.log(e);
        });
        // .get("/api/comments/:answerId")
        
    }
    // console.log(answer?._id);

    // await axios.get(`/api/comments/${answer?._id}`)
    // .then((res)=>{

    //   console.log(res.data);
    //   setComment(res.data);
    // })
    // .catch((e)=>{
    //   console.log(e);
    // })


    

  };
  // useEffect(() => {
  //   const getComment = async () => {
  //     await axios.get(`/api/comments/${post.answers._id}`)
  //     .then((res)=>{


  return (
    <div className="post">
      <div className="post__info">
        {/* <Avatar src={post?.user?.photo} /> */}
        <div className='post-user-profile-image'>
              {post.user.picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      height: "60px",
                      width: "60px",
                      borderRadius: "60%",
                      objectFit: "contain",
                    }}
                    src={post.user.picturePath}
                    alt="displayimage"
                  />
                )}
              </div>
        <h4>{post?.user?.Name}</h4>

        <small>
          {/* <LastSeen date={post?.createdAt} /> */}
          {new Date(post?.createdAt).toLocaleString()}
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{post?.questionName}</p>
          <button
            onClick={() => {
              setIsModalOpen(true);
              console.log(post?._id);
            }}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by <span className="name">{post?.user?.userName}</span> on{" "}
                <span className="name">
                  {new Date(post?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" className="postimg"/>}
      </div>
      {/* <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        
        <div className="post__footerLeft">
                      <ShareOutlined />
                    </div>
                  </div>
                  <div>
                    <button
                      className="rep-but"
                      onClick={() => handleCommentReply(post.answers._id)}
                    >
                      {selectedAnswer === post.answers._id ? <AddComment /> : <AddComment />}
                    </button>
                    {selectedAnswer === post.answers._id && (
                      <div>
                        <textarea
                          className="text-comment"
                          style={{
                            marginTop: "10px",
                            padding: "5px",
                            fontSize: "14px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            resize: "vertical",
                          }}
                          placeholder="Add a comment..."
                        />
                        <button className="submit-btn" style={{ marginTop: "10px" }}>
                          Submit
                        </button>
                      </div>
                    )}
                    
      </div> */}
      <div>
        <button className="comment-btn" onClick=
        {() => setExpanded(!expanded)} 
        >
          {expanded ? <ChatBubble /> : <ChatBubble />}

        </button>
        {expanded && (
          <div>
            {post?.answers?.map((answer) => (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px 5px",
                    borderTop: "1px solid lightgray",
                  }}
                  className="post-answer-container"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#888",
                    }}
                    className="post-answered"
                  >
                    {/* <Avatar src={answer?.questionId.user.picturePath} /> */}
                    {/* <div className='post-user-profile-image'>
              {answer?.questionId.user.picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      height: "60px",
                      width: "60px",
                      borderRadius: "60%",
                      objectFit: "contain",
                    }}
                    src={answer?.questionId.user.picturePath}
                    alt="displayimage"
                  />
                )}
              </div> */}
                    <div
                      style={{
                        margin: "0px 10px",
                      }}
                      className="post-info"
                    >
                      <p>{answer?.questionId.user.Name}</p>
                      <span>
                        <LastSeen date={answer?.createdAt} />
                      </span>
                    </div>
                  </div>
                  <div className="post-answer">{ReactHtmlParser(answer?.answer)}</div>
                  <div className="post__footer">
                    <div className="post__footerAction">
                    {/* <button onClick={handleFavoriteClick} className="">
                <FaHeart color={isLiked ? "#c065f2" : "#d7d2dd"} size={25} />
              </button> */}
              {/* <button onClick={handleFavoriteClick} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={isLiked ? "#c065f2" : "#d7d2dd"}
                    class="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />{" "}
                  </svg>

                  {answer.upvotes}
                </button> */}
                <button onClick={() => handleFavoriteClick(answer._id)} className="">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill={likedAnswerId === answer._id ? "#c065f2" : "#d7d2dd"}
    class="bi bi-heart-fill"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </svg>
  {answer.upvotes}
</button>

                      {/* <ArrowUpwardOutlined /> */}
                      <ArrowDownwardOutlined />
                    </div>
                    <div className="post__footerLeft">
                      {/* <ShareOutlined /> */}
                    </div>
                  </div>

                  <div>
                    {/* <button
                      className="rep-but"
                      // onClick=
                      onClick={() => handleCommentReply(post.answers._id)}
                      // {() => openCommentReply(answer._id)}

                    >
                      {selectedAnswer === post.answers._id ? <AddComment /> : <AddComment />}
                    </button> */}
                    <button
  className="rep-but"
  onClick={() => handleCommentReply(answer._id)}
>
  {selectedAnswer === answer._id ? <AddComment /> : <AddComment />}
</button>

                    {/* {selectedAnswer === post.answers._id && (
                      <div>
                        <textarea
                          className="text-comment"
                          style={{
                            marginTop: "10px",
                            padding: "5px",
                            fontSize: "14px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            resize: "vertical",
                          }}
                          placeholder="Add a comment..."
                        />
                        <button className="submit-btn" style={{ marginTop: "10px" }}>
                          Submit
                        </button>
                      </div>
                    )} */}
                    {selectedAnswer === answer._id && (
  <div>
    <textarea
      className="text-comment"
      style={{
        marginTop: "10px",
        padding: "5px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        resize: "vertical",
      }}
      placeholder="Add a comment..."
    />
    <button className="submit-btn" style={{ marginTop: "10px" }}>
      Submit
    </button>
  </div>
)}

                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {post?.answers.length} Answer(s)
      </p>

    </div>
  );
}

export default Post;
