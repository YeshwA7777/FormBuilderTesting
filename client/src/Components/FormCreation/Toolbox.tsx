import React from "react";
import { useDrag } from "react-dnd";
import { ReactComponent as HeaderIcon } from "../../Assets/heading.svg";
import { ReactComponent as FullNameIcon } from "../../Assets/fullName.svg";
import { ReactComponent as EmailIcon } from "../../Assets/email.svg";
import { ReactComponent as AddressIcon } from "../../Assets/address.svg";
import { ReactComponent as PhoneIcon } from "../../Assets/phone.svg";
import { ReactComponent as DatePickerIcon } from "../../Assets/datePicker.svg";
import { ReactComponent as ShortTextIcon } from "../../Assets/shortText.svg";
import { ReactComponent as LongTextIcon } from "../../Assets/longText.svg";
import { ReactComponent as DropDownIcon } from "../../Assets/dropdown.svg";
import { ReactComponent as DividerIcon } from "../../Assets/divider.svg";
import { ReactComponent as SingleChoiceIcon } from "../../Assets/singleChoice.svg";
import { ReactComponent as NumberInputIcon } from "../../Assets/numberInput.svg";
import { ReactComponent as ScaleRatingIcon } from "../../Assets/scaleRating.svg";
import { ReactComponent as StarRatingIcon } from "../../Assets/starRating.svg";
import { ReactComponent as TimeIcon } from "../../Assets/time.svg";
import { ReactComponent as MultipleChoiceIcon } from "../../Assets/multipleChoice.svg";
import { ReactComponent as RichTextIcon } from "../../Assets/richText.svg";
import { ReactComponent as SubmitIcon } from "../../Assets/submitButton.svg";
import { ReactComponent as PageBreakIcon } from "../../Assets/pageBreak.svg";

interface FormElement {
  id: string;
  type: string;
  label: string;
  category: string;
}

interface ToolboxProps {
  onDrop: (element: FormElement) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({ onDrop }) => {
  const availableElements = [
    { id: "header", type: "header", label: "Heading", category: "Form Fields" },
    {
      id: "fullname",
      type: "fullname",
      label: "Full Name",
      category: "Form Fields",
    },
    { id: "email", type: "email", label: "Email", category: "Form Fields" },
    {
      id: "address",
      type: "address",
      label: "Address",
      category: "Form Fields",
    },
    {
      id: "phonenumber",
      type: "phonenumber",
      label: "Phone Number",
      category: "Form Fields",
    },
    {
      id: "datepicker",
      type: "datepicker",
      label: "Date Picker",
      category: "Form Fields",
    },
    {
      id: "textinput",
      type: "textinput",
      label: "Short Text",
      category: "Basic Elements",
    },
    {
      id: "paragraph",
      type: "paragraph",
      label: "Long Text",
      category: "Basic Elements",
    },
    {
      id: "richtext",
      type: "richtext",
      label: "Paragraph",
      category: "Basic Elements",
    },
    {
      id: "dropdown",
      type: "dropdown",
      label: "Dropdown",
      category: "Basic Elements",
    },
    {
      id: "radiobuttons",
      type: "radiobuttons",
      label: "Single Choice",
      category: "Basic Elements",
    },
    {
      id: "multiplechoice",
      type: "multiplechoice",
      label: "Multiple Choice",
      category: "Basic Elements",
    },
    {
      id: "numberinput",
      type: "numberinput",
      label: "Number Input",
      category: "Basic Elements",
    },
    { id: "time", type: "time", label: "Time", category: "Basic Elements" },
    {
      id: "submitbutton",
      type: "submitbutton",
      label: "Submit",
      category: "Basic Elements",
    },
    {
      id: "starRating",
      type: "starRating",
      label: "Star Rating",
      category: "Survey Elements",
    },
    {
      id: "scaleRating",
      type: "scaleRating",
      label: "Scale Rating",
      category: "Survey Elements",
    },
    {
      id: "linebreak",
      type: "linebreak",
      label: "Divider",
      category: "Page Elements",
    },
    {
      id: "pagebreak",
      type: "pagebreak",
      label: "Page Break",
      category: "Page Elements",
    },
  ];

  interface GroupedElements {
    [category: string]: FormElement[];
  }

  const groupedElements = availableElements.reduce<GroupedElements>(
    (acc, element) => {
      if (!acc[element.category]) {
        acc[element.category] = [];
      }
      acc[element.category].push(element);
      return acc;
    },
    {}
  );

  return (
    <div>
      {Object.entries(groupedElements).map(([category, elements]) => (
        <div key={category}>
          <span
            style={{
              font: "DM Sans",
              fontWeight: "700",
              marginLeft: "25px",
              color: "#898989",
              marginBottom: "30px",
            }}
          >
            {category}
          </span>
          {elements.map((element) => (
            <DraggableElement
              key={element.id}
              element={element}
              onDrop={onDrop}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface DraggableElementProps {
  element: FormElement;
  onDrop: (element: FormElement) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  onDrop,
}) => {
  const [, drag] = useDrag({
    item: { id: element.id, type: element.type },
    type: element.type,
  });

  const Icon = () => {
    switch (element.type) {
      case "header":
        return <HeaderIcon />;
      case "fullname":
        return <FullNameIcon />;
      case "email":
        return <EmailIcon />;
      case "address":
        return <AddressIcon />;
      case "phonenumber":
        return <PhoneIcon />;
      case "datepicker":
        return <DatePickerIcon />;
      case "textinput":
        return <ShortTextIcon />;
      case "paragraph":
        return <LongTextIcon />;
      case "dropdown":
        return <DropDownIcon />;
      case "linebreak":
        return <DividerIcon />;
      case "radiobuttons":
        return <SingleChoiceIcon />;
      case "numberinput":
        return <NumberInputIcon />;
      case "scaleRating":
        return <ScaleRatingIcon />;
      case "starRating":
        return <StarRatingIcon />;
      case "time":
        return <TimeIcon />;
      case "multiplechoice":
        return <MultipleChoiceIcon />;
      case "richtext":
        return <RichTextIcon />;
      case "submitbutton":
        return <SubmitIcon />;
      case "pagebreak":
        return <PageBreakIcon />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    onDrop(element);
  };

  return (
    <div
      ref={drag}
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        maxWidth: "200px",
        marginLeft: "20px",
        height: "30px",
        display: "flex",
        alignItems: "left",
        justifyItems: "left",
        padding: "5px",
      }}
      onClick={handleClick}
    >
      <Icon />
      <span style={{ marginLeft: "10px", color: "#666666" }}>
        {element.label}
      </span>
    </div>
  );
};

export default Toolbox;
