import React, { useState } from "react"; // Importing React and useState hook
import {
  Box,
  Flex,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import "src/styling/project.css"; // Importing CSS styles for the component
import { FaRegFilePdf, FaUserLock } from "react-icons/fa6";
import { AiOutlineFileSync } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import RequestAccess from "./Request-Access";
import { toast } from "react-toastify"; // Import toast notifications

// Importing individual sections/components related to the project
import Project_Overview_Section from "../table-sections/Project-Overview-Section";
import Project_Audit_History_Section from "../table-sections/Project-Audit-History-Section";
import Project_Version_History_Section from "../table-sections/Project-Version-History-Section";
import Project_Escalation_Matrix_Section from "../table-sections/Project-Escalation-Matrix-Section";
import Project_Risk_Profiling_Section from "../table-sections/Project-Risk-Profiling-Section";
import Project_Scope_and_Stack_Section from "../table-sections/Project-Scope-and-Stack-Section";
import Project_Sprint_Details_Section from "../table-sections/Project-Sprint-Details-Section";
import Project_Stakeholder_Section from "../table-sections/Project-Stakeholder-Section";
import Project_Phases_Section from "../table-sections/Project-Phases-Section";
import Project_Project_Updates_Section from "../table-sections/Project-Project-Updates-Section";
import Project_MoMs_Section from "../table-sections/Project-MoMs-Section";
import Project_Approved_Teams_Section from "../table-sections/Project-Approved-Teams-Section";
import Project_Client_Feedback_Section from "../table-sections/Project-Client-Feedback-Section";
import Project_Resources_Section from "../table-sections/Project-Resources-Section";

// Project component definition
const Project = () => {
  // State variable to manage the active tab
  const [activeTab, setActiveTab] = useState(0);
  const [showRequests, setShowRequests] = useState(false);

  // Retrieve the base URL from environment variables
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // Extract the current pathname from the URL of the window
  const PATH_NAME = new URL(window.location.href).pathname;

  // Function to handle exporting data as PDF
  const handleExportButton = async () => {
    try {
      // Making a GET request to generate PDF
      const response = await fetch(`${BASE_URL}${PATH_NAME}/genPDF`);
    } catch (error) {
      toast.error("Error while Generating PDF");
    }
  };

  // Render JSX
  return (
    <Box className="project-component-wrapper">
      <Flex
        direction="Column"
        gap={15}
        className="project-component-flex"
        justify="Start"
        align="Start"
      >
        {/* Container for export button */}
        <div className="action-button-container">
          {/* Export button */}
          <a href={`${BASE_URL}${PATH_NAME}/genPDF`} download>
            {/* Anchor tag to initiate PDF download */}
            <button className="export-button" onClick={handleExportButton}>
              <FaRegFilePdf />
            </button>
          </a>
          <button>
            <AiOutlineFileSync />
          </button>
          <button
            onClick={() => {
              setShowRequests(!showRequests);
            }}
          >
            {showRequests ? <RxCross2 /> : <FaUserLock />}
          </button>
        </div>
        {showRequests ? (
          <RequestAccess />
        ) : (
          <>
            {/* Container for project tabs */}
            <div className="project-tab-box">
              {/* Tab list */}
              <TabList
                className="project-tab-list"
                tabType="stretched"
                onTabChange={(tabId) => {
                  setActiveTab(tabId);
                }}
              >
                {/* Individual tabs */}
                <Tab className="tab">Project Overview</Tab>
                <Tab className="tab">Scope and Stack</Tab>
                <Tab className="tab">Escalation Matrix</Tab>
                <Tab className="tab">Phases</Tab>
                <Tab className="tab">Sprint Details</Tab>
                <Tab className="tab">Risk Profiling</Tab>
                <Tab className="tab">Stakeholders</Tab>
                <Tab className="tab">Version History</Tab>
                <Tab className="tab">Audit History</Tab>
                <Tab className="tab">Project Updates</Tab>
                <Tab className="tab">MoM</Tab>
                <Tab className="tab">Approved Teams</Tab>
                <Tab className="tab">Client Feedback</Tab>
                <Tab className="tab">Resources</Tab>
              </TabList>
            </div>

            {/* Container for project sections */}
            <div className="project-section-box">
              {/* Tab panels */}
              <TabPanels activeTabId={activeTab}>
                {/* Individual tab panels */}
                <TabPanel>
                  {/* Project Overview Section */}
                  <Project_Overview_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Scope and Stack Section */}
                  <Project_Scope_and_Stack_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Escalation Matrix Section */}
                  <Project_Escalation_Matrix_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Phases Section */}
                  <Project_Phases_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Sprint Details Section */}
                  <Project_Sprint_Details_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Risk Profiling Section */}
                  <Project_Risk_Profiling_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Stakeholders Section */}
                  <Project_Stakeholder_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Version History Section */}
                  <Project_Version_History_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  {/* Audit History Section */}
                  <Project_Audit_History_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  <Project_Project_Updates_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  <Project_MoMs_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  <Project_Approved_Teams_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  <Project_Client_Feedback_Section activeTab={activeTab} />
                </TabPanel>
                <TabPanel>
                  <Project_Resources_Section activeTab={activeTab} />
                </TabPanel>
              </TabPanels>
            </div>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Project; // Exporting the Project component
