import { Add, Business, History, MusicNote, Psychology, Science, SportsEsports, Theaters, VideoLibrary } from "@material-ui/icons";
import React from "react";

const sidebarOptionsData = [
  {
    Icon: History,
    title: "History",
  },
  {
    Icon: Business,
    title: "Business",
  },
  {
    Icon: Business,
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
    Icon: Business,
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

function left() {
  return (
    <div className="flex flex-col">
      {sidebarOptionsData.map((option, index) => (
        <div key={index} className="flex items-center p-4 cursor-pointer hover:bg-gray-200 rounded-md">
          <option.Icon className="h-8 w-8 text-gray-600" />
          <p className="ml-4 text-gray-600 text-sm font-medium">{option.title}</p>
        </div>
      ))}
    </div>
  );
}

export default left;
