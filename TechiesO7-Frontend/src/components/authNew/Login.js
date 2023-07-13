import React, { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [Name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword]=useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [description, setDescription] = useState('');
  const [picturePath, setpicturePath] = useState("");
  // const [profilePic, setProfilePic] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541.jpg");
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      Name,
      email,
      password,
      age,
      sex,
      description,
      picturePath,
    };
  
    try {
      if (isSignUp) {
        // Sign Up
        const response = await axios.post('https://techieso7.onrender.com/api/auth/signup', userData);
        console.log('Sign Up Response:', response.data);
        navigate("/auth");
        window.location.reload();

      } else {
        // Login
        const response = await axios.post('https://techieso7.onrender.com/api/auth/signin', userData);
        console.log('Login Response:', response.data);
        localStorage.setItem('id', response.data.user._id);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // const handleProfilePicChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePic(URL.createObjectURL(file));
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (localStorage.getItem('id')!==undefined||localStorage.getItem('id')!==null) {
    //   navigate("/");
    // }
  },[]);

// const profilePic = "https://via.placeholder.com/300*300"
  return (
    <div className='main-body'>
    <div className="container-sign">
      <h2 className="h2-container">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {/* {isSignUp && (
        // <p>Create an account to access exclusive features.</p>
      )} */}
        <form className="form-sign" onSubmit={handleSubmit}>
        
        <input
         className='login-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
        className='login-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          {isSignUp && (
            <input
              className='login-input'
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
        
        {isSignUp && (
          <>
          <input
            className='login-input'
              type="text"
              maxLength="20"
              placeholder="Enter your Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          <div className="age-sex">
          <input
            className='sign-input'
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
        
            <select
            className='sign-select'
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

            {/* <input
            className='login-input'
              type="text"
              maxLength="20"
              placeholder="Enter your Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            /> */}
            <textarea className='sign-text'
              placeholder="Description about yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {/* <span className="file-upload-text">Upload Profile Picture</span>
            <label className="file-upload">
              <div className='profile-pic'>
              <img src={profilePic} alt="Profile" />
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
              </div>
            </label> */}
             <input
                  type="text"
                  className='question-input'
                  value={picturePath}
                  onChange={(e) => setpicturePath(e.target.value)}
                  
                  placeholder="Optional: include a link that gives context"
                />
               
            <span className="file-upload-text">Upload Profile Picture</span>
            
              <div className='profile-pic'>
              {picturePath !== "" && (
                  <img
                    style={{
                      // height: "40vh",
                      objectFit: "contain",
                    }}
                    src={picturePath}
                    alt="displayimage"
                  />
                )}
              </div>
          </>
        )}
        <button type="submit" onClick={handleSubmit} className='sign-button'>{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
      

      <p className="p-para">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span className="s-span" onClick={(n) => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </span>
      </p>
    </div>
    </div>
  );
};

export default Login;