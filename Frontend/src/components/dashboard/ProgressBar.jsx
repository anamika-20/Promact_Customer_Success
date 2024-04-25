import React from "react";
import "./styles.css"; // Import CSS file for styling

function ProgressBar({ level }) {
  let progressWidth;
  let barColor;

  switch (level) {
    case "low":
      progressWidth = "33.33%";
      barColor = "green";
      break;
    case "moderate":
      progressWidth = "66.66%";
      barColor = "orange";
      break;
    case "high":
      progressWidth = "100%";
      barColor = "red";
      break;
    default:
      progressWidth = "0%";
      barColor = "grey";
      break;
  }

  const progressStyle = {
    width: progressWidth,
    backgroundColor: barColor,
    height: "100%",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div className="progress-bar">
      <div className="progress" style={progressStyle}></div>
    </div>
  );
}

export default ProgressBar;
