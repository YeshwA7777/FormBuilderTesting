import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../App.css";

const CreateNewForm: React.FC = () => {
  const navigate = useNavigate();
  const [formName, setFormName] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");

  const handleCreateForm = () => {
    navigate("/form-builder");
  };

  return (
    <Box className="topColourBox">
      <Box className="headingBox">
        <span className="headingText">CREATE NEW FORM</span>
      </Box>
      <Box className="mainBG">
        <Box className="containerBox">
          <Box className="formDetailsBox">
            <span className="formNameText">FORM NAME</span>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              style={{
                marginTop: "50px",
                marginBottom: "10px",
                marginLeft: "40px",
                width: "700px",
                height: "40px",
                border: "none",
                backgroundColor: "#F7F7F7",
              }}
            />
            <span className="descriptionText">DESCRIPTION</span>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              style={{
                marginTop: "35px",
                marginBottom: "10px",
                marginLeft: "40px",
                width: "700px",
                height: "140px",
                border: "none",
                backgroundColor: "#F7F7F7",
                textAlign: "left",
                verticalAlign: "top",
                padding: "5px",
                resize: "none",
              }}
            />
            <Button className="createFormButton" onClick={handleCreateForm}>
              Create Form
            </Button>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default CreateNewForm;
