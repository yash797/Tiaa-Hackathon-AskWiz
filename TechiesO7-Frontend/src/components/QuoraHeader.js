import React, { useState, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import Notification from "./NotificationModal";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  // Close,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, Button, Input } from "@material-ui/core";
import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import QModal from "./QuestionModal";
import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
function QuoraHeader() {
  let navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [data, setData] = useState({});

  const Close = <CloseIcon />;
  const dispatch = useDispatch();
  // const signOut = () => {
  //   localStorage.removeItem("id");
  // };    
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
      await axios
        .post("https://techieso7.onrender.com/api/questions", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding question");
        });
    }
  };
  const handleProfile=async()=>{
      
      const id= localStorage.getItem('id');
      console.log(id);
      await axios.get(`https://techieso7.onrender.com/api/user/${id}`)
      .then((res)=>{
        setData(res.data);
        console.log(res.data);
      }
      
      )
      .catch((err)=>{
        console.log(err);
      }
      )
    }
const navigateToProfile = () => {
  
    window.location.href = `/profile/${data._id}`;
  };

 

  // const handleButtonClick = () => {
  //   const username = 'username'; // Replace 'username' with the actual username

  //   // Navigate to the profile route
  //   navigate(`/profile/${username}`);
  // };

  const handleLogout = () => {
    const Name = localStorage.getItem("Name");  
    if (window.confirm("Are you sure to logout ?")) {
    localStorage.removeItem("id")

    navigate("/");
    window.location.reload();


      
    }
  };
  useEffect(()=> {
    handleProfile();
  },[]);
  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <Link to="/">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          </Link>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <Link to="/messages">
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          </Link>
          <Link to="/profile/username">
         
          </Link>
          <div className="qHeader__icon-noti">
            <Notification />
          </div>
        </div>
        <div className="qHeader__input">
          <Search />
          <input type="text" placeholder="Search questions" />
        </div>
        {/* <div className="qHeader__Rem">
          <span onClick={navigateToProfile}>
            <Avatar src={user?.photo} />
            
          </span>
          

         <QModal/>
        </div> */}
        <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
      {/* <Avatar src={user?.photo} /> */}
      <div className='post-user-profile-image'>
              {data.picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      height: "40px",
                      width: "40px",
                      borderRadius: "60%",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                    src={data.picturePath}
                    alt="img"
                  />
                )}
              </div>
        
        <span className="dropdown-arrow">&#9660;</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            <li><button className="dropdown-item-prof " onClick={navigateToProfile}>View Profile</button></li>
            <li className="dropdown-item">Settings</li>
            <li className="dropdown-item" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}

    </div>
    <QModal/>

      </div>
    </div>
  );
}

export default QuoraHeader;
