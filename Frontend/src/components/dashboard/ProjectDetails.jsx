import React, { useEffect, useState, useContext } from "react";
import "./styles.css"; // Import CSS file for styling
import ProgressBar from "./ProgressBar";

const ProjectDetails = ({ project }) => {
  return (
    <div className="project-details">
      {console.log(project)}
      <div className="cards-container">
        <div className="card">
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>Project</p>

          <div
            style={{
              backgroundColor: "#E8E8E8",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              height: "12rem",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Description</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "10rem",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                obcaecati eaque suscipit, dolorem optio maiores nostrum
                consectetur dolore labore natus nobis!
              </p>
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "8rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p>Due Date</p>
                  <p style={{ fontWeight: "bold" }}>18th March, 2023</p>
                </div>
                <div>
                  <button style={{ padding: "0.5rem" }}>Start </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>Risk</p>
          <div className="progress-container">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>Financial</p>
              <p>Low</p>
            </div>
            <ProgressBar level="low" />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>Technical</p>
              <p>Moderate</p>
            </div>
            <ProgressBar level="moderate" />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>Operational</p>
              <p>High</p>
            </div>

            <ProgressBar level="high" />
          </div>
        </div>
        <div className="card">
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>Sprints</p>
          <div
            style={{
              height: "12rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#E8E8E8",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <p style={{ fontWeight: "bold" }}>One</p>
              <div>
                <p style={{ color: "green", marginBottom: "0.5rem" }}>
                  On Time
                </p>
                <p style={{}}>90% Completed</p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#E8E8E8",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Two</p>
              <div>
                <p style={{ color: "orange", marginBottom: "0.5rem" }}>
                  Waiting
                </p>
                <p style={{}}>Waiting for Condsideration</p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#E8E8E8",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Three</p>
              <div>
                <p style={{ color: "red", marginBottom: "0.5rem" }}>Delayed</p>
                <p style={{}}>20% Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
