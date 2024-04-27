// RenderFormElement.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Button } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "../../App.css";
import { useFormElements } from './FormElementsContext';

interface FormElement {
 id: string;
 type: string;
 label?: string;
 options?: string[];
 minValue?: number;
 maxValue?: number;
}

interface RenderFormElementProps {
 element: FormElement;
 onOptionChange: (elementId: string, updatedOptions: string[]) => void;
 onLabelChange: (elementId: string, updatedLabel: string) => void;
}

const RenderFormElement: React.FC<RenderFormElementProps> = ({
 element,
 onOptionChange,
 onLabelChange,
}) => {
 const [isHovered, setIsHovered] = useState<boolean>(false);
 const [options, setOptions] = useState<string[]>(element.options || ["", ""]);
 const [timeValue, setTimeValue] = useState<string>("");

 const handleMouseEnter = () => {
    setIsHovered(true);
 };

 const handleMouseLeave = () => {
    setIsHovered(false);
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const newLabel = e.target.textContent?.trim() || "";
    onLabelChange(element.id, newLabel);
 };

 const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    onOptionChange(element.id, updatedOptions);
 };

 const handleAddOption = () => {
    setOptions([...options, ""]);
 };

 const handleRemoveOption = (index: number) => {
    if (options.length === 2) {
      return;
    }
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
 };

 const renderElement = () => {
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
              <span
                style={{ color: "#000000" }}
                contentEditable
                onBlur={handleInputChange}
                suppressContentEditableWarning={true}
              >
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
              readOnly
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
              readOnly
            />
          </div>
        );
      case "email":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "E-mail"}
              </span>
              <br />
            </label>
            <input
              type="email"
              placeholder={"johnsmith@gmail.com"}
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
              readOnly
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
              readOnly
            />
            <label style={{ color: "#666666" }}>Street Address Line 2</label>
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
              readOnly
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
              readOnly
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
              readOnly
            />
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
              readOnly
            />
          </div>
        );
      case "phonenumber":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Phone Number"}
              </span>
              <br />
            </label>
            <input
              type="tel"
              placeholder={"(000) 000 - 000"}
              style={{
                position: "relative",
                top: "10px",
                right: "0px",
                width: "335px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
              readOnly
            />
          </div>
        );
      case "datepicker":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
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
              readOnly
            />
          </div>
        );
      case "textinput":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Short Text"}
              </span>
              <br />
            </label>
            <input
              type="text"
              placeholder={"Sample Input"}
              style={{
                position: "relative",
                top: "10px",
                right: "0px",
                width: "335px",
                border: "0.8px solid #E3E3E3",
                height: "40px",
                borderRadius: "5px",
              }}
              readOnly
            />
          </div>
        );
      case "paragraph":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <p>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Long Text"}
              </span>
              <br />
            </p>
            <textarea
              placeholder={"Sample Input"}
              style={{
                position: "relative",
                width: "685px",
                height: "200px",
                border: "0.8px solid #E3E3E3",
                borderRadius: "5px",
                resize: "none",
              }}
              readOnly
            />
          </div>
        );

      case "richtext":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "70px" }}>
            <p>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
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
              readOnly={true}
            />
          </div>
        );

      case "dropdown":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Drop Down"}
              </span>
              <br />
            </label>

            <button
              type="button"
              onClick={handleAddOption}
              style={{ position: "absolute", right: "505px", bottom: "20px" }}
            >
              Add Option
            </button>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Option"
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
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        );

      case "radiobuttons":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Single Choice"}
              </span>
              <br />
            </label>
            <button
              type="button"
              onClick={handleAddOption}
              style={{ position: "absolute", right: "505px", bottom: "20px" }}
            >
              Add Option
            </button>

            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Option"
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
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        );

      case "multiplechoice":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Multiple Choice"}
              </span>
              <br />
            </label>
            <button
              type="button"
              onClick={handleAddOption}
              style={{ position: "absolute", right: "505px", bottom: "20px" }}
            >
              Add Option
            </button>

            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Option"
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
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        );

      case "numberinput":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
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
              readOnly
            />
          </div>
        );

      case "linebreak":
        return (
          <hr
            style={{
              border: "2px solid #F7F7F7;",
              marginLeft: "90px",
              width: "685px",
              marginBottom: "25px",
            }}
          />
        );

      case "label":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Sub Heading"}
              </span>
              <br />
            </label>
          </div>
        );

      case "starRating":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "30px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {"Type a Question"}
              </span>
              <br />
            </label>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map(() => {
                return (
                  <button
                    type="button"
                    disabled
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "30px",
                      }}
                    >
                      &#9733;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "scaleRating":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {"Type a Question"}
              </span>
              <br />
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{element.minValue}</span>
              <input type="range" style={{ margin: "0 10px" }} />
              <span>{element.maxValue}</span>
            </div>
          </div>
        );
      case "time":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Time"}
              </span>
              <br />
            </label>
            <input
              type="time"
              // value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
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

      case "submitbutton":
        return (
          <div style={{ marginLeft: "90px", marginBottom: "60px" }}>
            <Button className="submitElementButton">SUBMIT</Button>
          </div>
        );
      case "checkboxes":
        return (
          <div
            style={{
              border: "2px dashed #000",
              marginLeft: "20px",
              marginBottom: "60px",
            }}
          >
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Check Box"}
              </span>
              <br />
            </label>
            {element.options &&
              element.options.map((option, index) => (
                <div key={`${element.id}-${index}`}>
                  <input type="checkbox" readOnly />
                  <label>{option}</label>
                </div>
              ))}
          </div>
        );
      case "multiplechoice":
        return (
          <div
            style={{
              border: "2px dashed #000",
              marginLeft: "20px",
              marginBottom: "60px",
            }}
          >
            <label>
              <span
                style={{ color: "#666666" }}
                contentEditable
                onBlur={handleInputChange}
              suppressContentEditableWarning={true}
              >
                {element.label || "Multiple Choice"}
              </span>
              <br />
            </label>
            {element.options &&
              element.options.map((option, index) => (
                <div key={`${element.id}-${index}`}>
                  <input type="radio" name={element.id} readOnly />
                  <label>{option}</label>
                </div>
              ))}
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

  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer",
        minWidth: "800px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            minWidth: "740px",
            maxWidth: "740px",
            height: "fitContent",
            top: "-5px",
            left: "60px",
            right: "10px",
            bottom: "10px",
            border: "2px dashed #d8541a",
            borderRadius: "10px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}
      {renderElement()}
    </div>
  );
};

export default RenderFormElement;
