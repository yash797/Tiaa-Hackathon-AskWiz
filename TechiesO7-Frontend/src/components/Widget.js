import React from "react";
import WidgetContent from "./WidgetContent";
import "./css/Widget.css";

function Widget() {
  return (
    <div className="widget">
      <div className="widget__header">
        <h5 className="text-4xl text-red-700 bg-blue-500">Space to follow</h5>
      </div>
      <div className="widget__contents">
        <WidgetContent />
      </div>
    </div>
  );
}

export default Widget;
