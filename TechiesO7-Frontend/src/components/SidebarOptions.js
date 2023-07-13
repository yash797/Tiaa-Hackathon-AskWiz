import { Add, Business, History, MusicNote, Psychology, Science, SportsEsports, Theaters, VideoLibrary } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { changeCategory } from "../feature/filterSlice";
import { useState } from 'react';
import { useSelector } from "react-redux";
import "./css/SidebarOptions.css";
// import {ScienceIcon} from '@mui/icons-material/Science';
const options = [
  {
    Icon: History,
    title: "All Categories",
  },
  {
    Icon: History,
    title: "History",
  },
  {
    Icon: Business,
    title: "Business",
  },
  {
    Icon: History,
    title: "Psychology",
  },

  {
    Icon: SportsEsports,
    title: "Sports",
  },
  {
    Icon: MusicNote,
    title: "Music",
  },
  {
    Icon: VideoLibrary,
    title: "Science",
  },
  {
    Icon: Theaters,
    title: "Movies",
  },
  {
    Icon: VideoLibrary,
    title: "Technology",
  },
  {
    Icon: Add,
    title: "Discover Spaces",
  },
];

function SidebarOptions() {
  const category = useSelector((state) => state.filter.category);

  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const handleCategory = (e) => {
    if(e==="All Categories"){
      e=null
    }

    dispatch(changeCategory(e));
  };

  const isMobile = window.innerWidth <= 768;

  if (isMobile && selectedOption === null) {
    return (
      <div className="options-container">
        <div className="option-list" onClick={() => setSelectedOption(0)}>
          <p className="option-title">Options List</p>
        </div>
      </div>
    );
  }

    return (
    <div className="options-container">
      {options.map((option, index) => (
        <div
          key={index}
          // className="option-container"
          className= {category=== option.title?"active-option-container":"option-container"}

          onClick={() => {setSelectedOption(selectedOption === index ? null : index)
          handleCategory(option.title)
        }}
        >
          <div className= "option-header">
            <option.Icon className="icon" />
            <p className="option-title">{option.title}</p>
          </div>
          
          {selectedOption === index && (
            <div className="option-details">
              <p className="option-description">{option.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>

  );
}

export default SidebarOptions;
