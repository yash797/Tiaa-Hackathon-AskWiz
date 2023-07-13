import { Avatar } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import axios from "axios";
import "./css/QuoraBox.css";

function QuoraBox() {
  
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
  useEffect(()=> {
    handleProfile();
  },[]);
  return (
    <div className="quoraBox">
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
      <div className="quoraBox__quora">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  );
}

export default QuoraBox;
