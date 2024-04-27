import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../App.css";
import PublishIcon from "../../Assets/publish.svg";
import FormCreationIcon from "../../Assets/formCreation.svg";
import SettingsIcon from "../../Assets/settings.svg";
import { ReactComponent as QuickShareIcon } from "../../Assets/quickShare.svg";
import { ReactComponent as AssignFormIcon } from "../../Assets/assignForm.svg";
import { ReactComponent as EmailIcon } from "../../Assets/email.svg";
import { ReactComponent as PDFIcon } from "../../Assets/pdf.svg";

const PublishForm: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToMyForms = () => {
    navigate("/");
  };

  const handlePublishForm = () => {
    navigate("/publish-form");
  };

  const handleFormCreation = () => {
    navigate("/form-builder");
  };

  return (
    <Box className="topColourBox">
      <Box className="headingBox">
        <span className="headingTextPublish">PUBLISH</span>
        <Button
          className="backToFormsButtonInPublish"
          onClick={handleBackToMyForms}
        >
          Back To My Forms
        </Button>
        <img
          src={PublishIcon}
          onClick={handlePublishForm}
          className="publishButton"
        />
        <img
          src={FormCreationIcon}
          onClick={handleFormCreation}
          className="formCreationButton"
        />
        <img src={SettingsIcon} className="settingsButton" />
      </Box>
      <Box className="mainBG">
        <Box className="containerBox">
          <Box className="formElementsBox">
            <div
              style={{
                marginTop: "30px",
                marginLeft: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  font: "DM Sans",
                  fontWeight: "400",
                  height: "40px",
                }}
              >
                <QuickShareIcon style={{ marginRight: "10px" }} />
                Quick Share
              </span>
              <br />
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  font: "DM Sans",
                  fontWeight: "400",
                  height: "40px",
                }}
              >
                <AssignFormIcon style={{ marginRight: "10px" }} />
                Assign Form
              </span>
              <br />
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  font: "DM Sans",
                  fontWeight: "400",
                  height: "40px",
                }}
              >
                <EmailIcon style={{ marginRight: "10px" }} />
                Email Form
              </span>
              <br />
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  font: "DM Sans",
                  fontWeight: "400",
                  height: "40px",
                }}
              >
                <PDFIcon style={{ marginRight: "10px" }} />
                PDF
              </span>
              <br />
            </div>
          </Box>
          <Box className="quickShareBox1">
            <span className="formNameText">BOX 1</span>
          </Box>
          <Box className="quickShareBox2">
            <span className="formNameText">BOX 2</span>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default PublishForm;
