import React, { useState, useEffect } from "react";
import { Box, Flex, Button } from "monday-ui-react-core";
import CrudTable from "./Table.jsx";
import "../styling/project_escalation_matrix_section.css";
import axios from "axios";

let data = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];

const Project_Escalation_Matrix_Section = ({ active }) => {
  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/escalation_matrix",
        [...changedTableRows]
      );
      console.log(response);
      setShowSaveButton(false);
      setChangedTableRows([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/escalation_matrix"
      );
      const { data } = await response.json();
      console.log(data);
      setEscalationMatrix(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("check", active);
    if (!active) return;
    console.log("fetching data");
    fetchData();
  }, [active]);

  const uniqueTypes = () => {
    const types = new Set();
    escalationMatrix.forEach((element) => {
      types.add(element.escalation_type);
    });
    console.log("set", types);
    return types;
  };

  // generateColumn();
  return (
    <>
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      <Box className="escalation-matrix-table">
        <Flex direction="Column" align="Start" gap={20}>
          {escalationMatrix.length > 0 && (
            <>
              
              <div className="table-container">
                <h3 className="table-heading">Operational Escalation Matrix</h3>
                <CrudTable
                  setChangedTableRows={setChangedTableRows}
                  data={escalationMatrix.filter(
                    (item) => item.escalation_type === "operational"
                  )}
                  invalidColumns={[
                    "_id",
                    "__v",
                    "escalation_type",
                    "project_id",
                  ]}
                  defaultValues={{ escalation_type: "operational" }}
                  columnType={[]}
                  setShowSaveButton={setShowSaveButton}
                />
              </div>
            
            </>
          )}
          <div className="financial-matrix-table"></div>
        </Flex>
      </Box>
    </>
  );
};

export default Project_Escalation_Matrix_Section;
