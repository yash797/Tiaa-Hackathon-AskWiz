import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ProfileNew from "./components/Profile/profile"
import Login from "./components/auth/Login";
import Message from "./components/message/Message";
import Quora from "./components/Quora";
import QuoraHeader from "./components/QuoraHeader";
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";
import Profile from "./components/Profile/profile";
import LoginS from "./components/authNew/Login";
// import { useNavigate } from "react-router-dom";
function App() {
  // let navigate = useNavigate();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // if(localStorage.getItem("id") !== undefined||localStorage.getItem("id") !==null){
    //   navigate("/auth")
    // }
      // dispatch(
      //   login({
      //     userName: localStorage.getItem("userName"),
      //     photo: localStorage.getItem("photo"),
      //     email: localStorage.getItem("email"),
      //     uid: localStorage.getItem("uid"),
      //   })
      // );
    // }
    // onAuthStateChanged(auth, (authUser) => {
    //   if (authUser) {
    //     dispatch(
    //       login({
    //         userName: authUser.displayName,
    //         photo: authUser.photoURL,
    //         email: authUser.email,
    //         uid: authUser.uid,
    //       })
    //     );
    //     console.log("AuthUser", authUser);
    //     localStorage.setItem("userName",(authUser.displayName));
    //   }
    // });
  }, []);
  return (
    <BrowserRouter>
    <QuoraHeader />
    <Routes>
    {/* <div className="App"> */}
      {/* <h1>This is for testing</h1> */}
    <Route path='/' element={<Quora /> } />

      
    {/* </div>  */}
    {/* <Route index element={<Quora />} /> */}
    <Route path='/messages' element={<Message /> } />
    <Route path='/auth' element={<LoginS /> } />

    <Route path='/profile/:username' element={<Profile /> } />

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
