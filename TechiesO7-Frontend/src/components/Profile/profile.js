import React from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import Card from './Card';
import './card.css'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
import "../css/Profile.css";
import { auth } from "../../firebase";
import { Avatar } from '@material-ui/core';

import 'swiper/swiper-bundle.css';
import axios from 'axios';

SwiperCore.use([Pagination, Navigation]);


const Profile = () => {
  function messageme(){
    const message = " Hello World";
    // window.alert(message);
    window.location.href="http://localhost:3000/messages";
  }
  const [posts, setPosts] = useState([]);

  let Link="https://techieso7.onrender.com/api/questions"; 
  
  const handlePost = () => {
    axios
        .get(Link)
        

        .then((res) => {
          console.log(res.data.data.reverse());
          setPosts(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });

  }
  const [data, setData] = useState({});

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

  // const user = useSelector(selectUser);
  


    const [imageURL, setImageURL] = useState('');

    useEffect(()=> {
        async function fetchRandomImage(){
            const response = await fetch('https://api.unsplash.com/photos/random/?query=technology&client_id=lZE-i5apl79LE2svJXNgwPHu0b8q9Ubu1vKL4eGv_UQ');
            const data = await response.json();
            setImageURL(data.urls.regular);
        }
        fetchRandomImage();
        handleProfile();
        handlePost();

      },[]);
  return (
    <>

    
    <div className="profile-container" >
        <div className="profile-header">
            <div className="profile-banner">
                {imageURL && <img className="profile-banner-image" src={imageURL} alt="Cover-pic"/>}
            </div>
        </div>
        <div className="profile-body">
            <div className="profile-photo">
                {/* <Avatar src={user?.photo} /> */}
                {/* <div className='profile-photo-pic'> */}
              {data.picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      height: "75%",
                      width: "75%",
                      borderRadius: "50%",
                      objectFit: "contain",
                      // marginRight: "50%",
                    }}
                    src={data.picturePath}
                    alt="displayimage"
                  />
                )}
              {/* </div> */}
                {/* <img className="profile-photo-pic" src={user?.picturePath} alt="profile_photo"/> */}
            </div>
            <div className="profile-body-container">
                <div className="user-header">
                    <h2 className="user-title">{data.Name}</h2>
                    <p className="user-description"> {data.description}
                    </p>
                </div>
                <ul className="user-data">
                    <li className="data-item">40 Questions</li>
                    <li className="data-item">
                      <div className="messagebutton"> 
                        <button onClick={messageme}>
                          Message
                        </button>
                      </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>



<h2 className="post-section">Recent Questions</h2>

    <Swiper
    effect={"coverflow"}
    grabCursor={true}
    spaceBetween={10}
    slidesPerView={"1"}
    breakpoints={{
      220: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      840: {
        slidesPerView: 2,
        spaceBetween: -10,
      },
      1020: {
        slidesPerView: 2,
        spaceBetween: -40,
      },
      1220: {
        slidesPerView: 3,
        spaceBetween: -40,
      },
    }}
    centeredSlides={true}
    loop={false}
    // coverflowEffect={{
    //   rotate: 50,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 1,
    //   slideShadows: true,
    // }}
    pagination={true}
    navigation={true}
    modules={[Pagination, Navigation]}
    className="mySwiper"
  >
      {/* {members.map((member, i) => (
        <SwiperSlide key={`slide-${i}`}>
          <Card member={member} i={i} />
        </SwiperSlide>
      ))} */}
      
      {posts.map((member, i) => (
        member?.user!==undefined &&
        member?.user._id===localStorage.getItem('id') &&
       <SwiperSlide key={`slide-${i}`}>
        {/* console.log(member), */}
          {/* <Card post={post} i={i} /> */}
          <div key={`member${i}`} className="profile-posts">
      
      <div className="postNew">
            <div className="post-header">
                {/* <div className="post-user-profile">
                    <img src={user?.photo} alt="user-profile" className='post-user-profile-image' />
                </div> */}
                <div className='post-user-profile-image'>
              {data.picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      height: "60px",
                      width: "60px",
                      borderRadius: "60%",
                      objectFit: "contain",
                    }}
                    src={data.picturePath}
                    alt="displayimage"
                  />
                )}
              </div>
                <div className="post-user-details">
                    <h3 className="post-username">
                    {member.user.Name}
                    </h3>
                    <div>
                      <p className="post-date">
                          {member.createdAt.slice(0,10)}
                      </p>
                      <p className="post-tag">
                          {member.category}
                      </p>
                    </div>
                    
                </div>
            </div>
            <p className="post-body">
                {member.questionName}
            </p>
            <div className="post-image">
                <img src={member.questionUrl} alt="article-banner" className='post-image-imge'/>
            </div>
        </div>

    </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default Profile;
