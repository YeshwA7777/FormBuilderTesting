// FormBuilder.tsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Toolbox from "./Toolbox";
import DroppableFormArea from "./DroppableFormArea";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import PublishIcon from "../../Assets/publish.svg";
import FormCreationIcon from "../../Assets/formCreation.svg";
import SettingsIcon from "../../Assets/settings.svg";
import { ReactComponent as AddLogoIcon } from "../../Assets/addYourLogo.svg";
import { useCreateFormMutation } from "../../service/APIs";
import { useFormElements } from "./FormElementsContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface FormElement {
  id: string;
  type: string;
  label?: string; // Add the label property
  category?: string;
  items?: FormElement[];
  // Add other properties as needed
}

const FormBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { formElements, setFormElements } = useFormElements();
  const [activeButton, setActiveButton] = useState<string>("");
  const [formName, setFormName] = useState<string>(""); // Declare and initialize formName
  const [formType, setFormType] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [createForm, { isLoading, isError }] = useCreateFormMutation();

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setLogo(event.target.files[0]);
    }
  };

  // Function to trigger file selection
  const handleAddLogoClick = () => {
    logoInputRef.current?.click();
  };

  // Function to handle the removal of the logo
  const handleRemoveLogo = () => {
    setLogo(null);
  };

  const handleOptionChange = (elementId: string, updatedOptions: any) => {
    const updatedElements = formElements.map((element) => {
      if (element.id === elementId) {
        return { ...element, options: updatedOptions };
      }
      return element;
    });
    setFormElements(updatedElements);
  };
  const handlePreviewClick = () => {
    navigate("/form-preview");
  };

  // When the label is edited
  const handleLabelChange = (elementId: string, updatedLabel: string) => {
    setFormElements((prevElements) =>
      prevElements.map((element) => {
        if (element.id === elementId) {
          return { ...element, label: updatedLabel };
        }
        return element;
      })
    );
  };

  const handleDrop = (item: any) => {
    const newItem = { ...item, id: uuidv4() };
    setFormElements([...formElements, newItem]);
  };

  const handleEdit = (updatedElements: FormElement[]) => {
    setFormElements(updatedElements);
  };

  const handleDelete = (elementId: string) => {
    const updatedElements = formElements.filter(
      (element) => element.id !== elementId
    );
    setFormElements(updatedElements);
  };

  const handleReorder = (reorderedElements: FormElement[]) => {
    setFormElements(reorderedElements);
  };

  const handleBackToMyForms = () => {
    navigate("/");
  };

  const handlePublishForm = async () => {
    try {
      // Adjust the formData structure to match the backend expectation
      const formData = {
        formData: formElements.map((element) => ({
          category: element.category, // Assuming all elements belong to "Form Fields" category
          id: element.id,
          label: element.label,
          type: element.type,
        })),
        formName,
        formType,
        // workflowState: "published", // Uncomment if you need to include the workflowState
      };
      console.log("Form data before sending:", formData); // Log the form data
      const publishedForm = await createForm(formData).unwrap();
      console.log("Response from server:", publishedForm); // Log the server response
      const uniqueLink = `http://localhost:3000/forms/link/${publishedForm.uniqueLink}`;
      console.log("Form published successfully");
      console.log("Unique link:", uniqueLink);
      // Show the unique link in a modal or a notification
    } catch (error) {
      console.error("Error publishing form:", error);
    }
  };

  const handleFormCreation = () => {
    setActiveButton("formCreation");
    navigate("/form-builder");
  };

  const handleSettings = () => {
    setActiveButton("settings");
  };

  return (
    <Box className="topColourBox">
      <Box className="headingBox">
        <span className="headingText">FORM CREATION</span>
        <Button className="backToFormsButton" onClick={handleBackToMyForms}>
          Back To My Forms
        </Button>
        <img
          src={PublishIcon}
          onClick={handlePublishForm}
          className={`publishButton ${
            activeButton === "publish" ? "active" : ""
          }`}
        />
        <img
          src={FormCreationIcon}
          onClick={handleFormCreation}
          className={`formCreationButton ${
            activeButton === "formCreation" ? "active" : ""
          }`}
        />
        <img
          src={SettingsIcon}
          onClick={handleSettings}
          className={`settingsButton ${
            activeButton === "settings" ? "active" : ""
          }`}
        />
      </Box>
      <Box className="mainBG">
        <Box className="containerBox">
          <Box className="formElementsBox">
            <div style={{ marginTop: "35px", cursor: "pointer" }}>
              <Toolbox onDrop={handleDrop} />
            </div>
          </Box>
          <Box className="addLogoBox">
            {/* Hidden file input for logo selection */}
            <input
              type="file"
              ref={logoInputRef}
              style={{ display: "none" }}
              onChange={handleLogoChange}
              accept="image/*"
            />
            {/* Container for the logo and icons */}
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Trigger file selection on icon click */}
              <AddLogoIcon onClick={handleAddLogoClick} />
              {/* Optionally, display the selected logo */}
              {logo && (
                <div style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Selected Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  {/* Icons for editing and removing the logo, visible on hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      display: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.display = "flex")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.display = "none")
                    }
                  >
                    <EditIcon
                      onClick={handleAddLogoClick}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={handleRemoveLogo}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Box>
          <Box className="droppableAreaBox">
            <DroppableFormArea
              formElements={formElements}
              onDrop={handleDrop}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReorder={handleReorder}
              onPreviewClick={handlePreviewClick}
              onOptionChange={handleOptionChange}
              onLabelChange={handleLabelChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormBuilder;
