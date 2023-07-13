import React from "react";
import Feed from "./Feed";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import "./css/Quora.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Quora() {
  let navigate = useNavigate();

  useEffect(() => {
  if(localStorage.getItem("id") === undefined||localStorage.getItem("id") === null){
    navigate("/auth")
  }
}, []);
  return (
    <div className="quora">
      {/* <QuoraHeader /> */}
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Quora;
