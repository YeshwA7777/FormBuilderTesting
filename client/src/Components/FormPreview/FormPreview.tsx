import React from "react";
import { useFormElements } from '../FormCreation/FormElementsContext'; // Adjust the import path as necessary
import { Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";

interface FormElement {
 id: string;
 type: string;
 label?: string;
 options?: string[];
 minValue?: number;
 maxValue?: number;
}

const FormPreview: React.FC = () => {
 const { formElements } = useFormElements(); // Use the context to access form elements
 const [starRatings, setStarRatings] = React.useState<Record<string, number>>({});
 const [formName, setFormName] = React.useState<string>("");
 const [formType, setFormType] = React.useState<string>("");
 const [openDialog, setOpenDialog] = React.useState<boolean>(false);
 const [formValues, setFormValues] = React.useState<Record<string, any>>({});
 const [currentPage, setCurrentPage] = React.useState<number>(0);

  const calculateTotalPages = () => {
    let pageCount = 1;
    formElements.forEach((element) => {
      if (element.type === "pagebreak") {
        pageCount++;
      }
    });
    return pageCount;
  };

  const totalPages = calculateTotalPages();
  

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "header":
        return (
          <div
            style={{
              marginLeft: "90px",
              marginTop: "40px",
              marginBottom: "60px",
            }}
          >
            <h1>
              <span style={{ color: "#000000" }}>
                {element.label || "Heading"}
              </span>
              <br />
            </h1>
          </div>
        );
      case "fullname":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label style={{ color: "#666666" }}>First Name</label>
            <input
              type="text"
              placeholder="John"
              className="firstNameBox"
              style={{
                position: "relative",
                top: "40px",
                right: "70px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
            <label
              style={{ color: "#666666", position: "relative", right: "40px" }}
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Smith"
              className="secondNameBox"
              style={{
                position: "relative",
                top: "40px",
                right: "110px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "email":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "E-mail"}
              </span>
              <br />
            </label>
            <input
              type="email"
              placeholder="johnsmith@gmail.com"
              className="emailTextBox"
              style={{
                marginRight: "10px",
                position: "relative",
                top: "10px",
                right: "0px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "address":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "40px" }}>
            <label style={{ color: "#666666" }}>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              style={{
                marginRight: "10px",
                position: "relative",
                top: " 35px",
                right: "90px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
                width: "685px",
                marginBottom: "45px",
              }}
            />
            <br />
            <label style={{ color: "#666666" }}>Street Address Line 2</label>
            <br />
            <input
              type="text"
              placeholder="Street Address Line 2"
              style={{
                marginRight: "10px",
                position: "relative",
                top: " 10px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
                width: "685px",
                marginBottom: "45px",
              }}
            />
            <br />
            <label
              style={{ color: "#666666", position: "relative", bottom: "35px" }}
            >
              City
            </label>
            <input
              type="text"
              placeholder="City"
              style={{
                marginRight: "10px",
                position: "relative",
                right: "30px",
                width: "325px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            />
            <label
              style={{
                color: "#666666",
                position: "relative",
                bottom: "35px",
                right: "10px",
              }}
            >
              State/Province
            </label>
            <input
              type="text"
              placeholder="State/Province"
              style={{
                marginRight: "10px",
                position: "relative",
                top: "0px",
                right: "100px",
                width: "325px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
            <br />
            <label
              style={{ color: "#666666", position: "relative", bottom: "20px" }}
            >
              Postal/Zip
            </label>
            <input
              type="text"
              placeholder="Postal/Zip"
              style={{
                marginRight: "10px",
                position: "relative",
                top: "20px",
                right: "65px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
                width: "685px",
              }}
            />
          </div>
        );
      case "phonenumber":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Phone Number"}
              </span>
              <br />
            </label>
            <input
              type="tel"
              placeholder="(000) 000 - 000"
              style={{
                position: "relative",
                top: "10px",
                right: "0px",
                width: "335px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "datepicker":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Date Picker"}
              </span>
              <br />
            </label>
            <input
              type="date"
              style={{
                position: "relative",
                top: "10px",
                right: "0px",
                width: "335px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "textinput":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Short Text"}
              </span>
              <br />
            </label>
            <input
              type="text"
              placeholder="Sample Input"
              style={{
                position: "relative",
                top: "10px",
                right: "0px",
                width: "335px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "paragraph":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <p>
              <span style={{ color: "#666666" }}>
                {element.label || "Long Text"}
              </span>
              <br />
            </p>
            <textarea
              placeholder="Sample Input"
              style={{
                position: "relative",
                width: "685px",
                height: "200px",
                border: "0.8px solid #E3E3E3",
                borderRadius: "5px",
                resize: "none",
              }}
            />
          </div>
        );

      case "richtext":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "70px" }}>
            <p>
              <span style={{ color: "#666666" }}>
                {" "}
                {element.label || "Paragraph"}
              </span>
              <br />
            </p>
            <ReactQuill
              theme="snow"
              placeholder={"Type Paragraph here..."}
              style={{
                position: "relative",
                width: "685px",
                height: "200px",
                borderRadius: "5px",
              }}
              readOnly={false}
              // onChange={handleInputChange}
            />
          </div>
        );
      case "dropdown":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Drop Down"}
              </span>
              <br />
            </label>
            <select
              style={{
                marginRight: "10px",
                width: "200px",
                position: "relative",
                top: "10px",
                right: "0px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            >
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "radiobuttons":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Single Choice"}
              </span>
              <br />
            </label>
            {element.options?.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={element.id}
                  value={option}
                  style={{ marginRight: "10px" }}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case "submitbutton":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <Button className="submitElementButton">SUBMIT</Button>
          </div>
        );
      case "multiplechoice":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Multiple Choice"}
              </span>
              <br />
            </label>
            {element.options?.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={element.id}
                  value={option}
                  style={{ marginRight: "10px" }}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case "numberinput":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Number Input"}
              </span>
              <br />
            </label>
            <input
              type="number"
              placeholder={element.label || "Number Input"}
              style={{
                marginRight: "10px",
                width: "335px",
                position: "relative",
                top: "10px",
                right: "0px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "linebreak":
        return (
          <hr
            style={{
              border: "2px solid #F7F7F7",
              marginLeft: "90px",
              width: "685px",
            }}
          />
        );
      case "label":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Sub Heading"}
              </span>
              <br />
            </label>
          </div>
        );
      case "starRating":
        const handleStarClick = (rating: number) => {
          setStarRatings((prev) => ({ ...prev, [element.id]: rating }));
        };

        const currentRating = starRatings[element.id] || 0;

        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Type a Question"}
              </span>
              <br />
            </label>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginRight: "10px",
                    color: index < currentRating ? "goldenrod" : "#666666",
                  }}
                  onClick={() => handleStarClick(index + 1)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        );

      case "scaleRating":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Type a Question"}
              </span>
              <br />
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{element.minValue}</span>
              <input
                type="range"
                min={element.minValue}
                max={element.maxValue}
                style={{ margin: "0 10px" }}
              />
              <span>{element.maxValue}</span>
            </div>
          </div>
        );
      case "time":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span style={{ color: "#666666" }}>
                {element.label || "Time"}
              </span>
              <br />
            </label>
            <input
              type="time"
              style={{
                marginRight: "10px",
                width: "335px",
                position: "relative",
                top: "10px",
                right: "0px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      case "pagebreak":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <Button className="pagebreakButton1">BACK</Button>
            <Button className="pagebreakButton2">NEXT</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFormElements = () => {
    return formElements.map((element) => (
       <React.Fragment key={element.id}>
         {renderFormElement(element)}
       </React.Fragment>
    ));
   };
   

  const handleBackClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log("Form submitted");
    }
  };

  return (
    <Box className="topColourBox">
      <Box className="previewMainBg">
        <Box className="formPreviewBox">
          <form style={{ marginLeft: "10px" }}>{renderFormElements()}</form>
          {/* {currentPage > 0 && (
              <Button className="pagebreakButton3" onClick={handleBackClick}>
                BACK
              </Button>
            )}
            {currentPage < totalPages - 1 ? (
              <Button className="pagebreakButton4" onClick={handleNextClick}>
                NEXT
              </Button>
            ) : (
              <Button className="pagebreakButton4" onClick={handleNextClick}>
                SUBMIT
              </Button>
            )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default FormPreview;
