import React from "react";
import { useDrop } from "react-dnd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import RenderFormElement from "./RenderFormElement";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as DeleteIcon } from "../../Assets/delete.svg";
import { ReactComponent as PreviewButton } from "../../Assets/previewButton.svg";
import "../../App.css";

interface FormElement {
  id: string;
  type: string;
  items?: FormElement[];
}

interface DroppableFormAreaProps {
  formElements: FormElement[];
  onDrop: (item: any) => void;
  onEdit: (elements: FormElement[]) => void;
  onDelete: (elementId: string) => void;
  onReorder: (elements: FormElement[]) => void;
  onPreviewClick: () => void;
  onOptionChange: (elementId: string, option: any) => void;
  onLabelChange: (elementId: string, updatedLabel: string) => void;
}

const DroppableFormArea: React.FC<DroppableFormAreaProps> = ({
  formElements,
  onDrop,
  onEdit,
  onDelete,
  onReorder,
  onPreviewClick,
  onOptionChange,
  onLabelChange,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      "header",
      "label",
      "paragraph",
      "linebreak",
      "dropdown",
      "tags",
      "checkboxes",
      "multiplechoice",
      "textinput",
      "email",
      "numberinput",
      "phonenumber",
      "twocolumnrow",
      "threecolumnrow",
      "fourcolumnrow",
      "radiobuttons",
      "datepicker",
      "fullname",
      "address",
      "starRating",
      "scaleRating",
      "time",
    ],
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult() as { rowIndex?: number };
      if (dropResult && dropResult.rowIndex !== undefined) {
        handleDrop(item as FormElement, dropResult.rowIndex);
      } else {
        onDrop({ ...(item as FormElement), id: uuidv4() });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  const handleDeleteClick = (elementId: string) => {
    onDelete(elementId);
  };

  const handleDrop = (item: any, rowIndex: number) => {
    const newItem = { ...item, id: uuidv4() };
    if (item.type.endsWith("columnrow")) {
      const updatedElements = [...formElements];
      const rowElement = updatedElements[rowIndex];
      if (
        rowElement.items &&
        rowElement.items.length < getColumnCount(item.type)
      ) {
        rowElement.items.push(newItem);
        onEdit(updatedElements);
      }
    } else {
      onDrop(newItem);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedElements = Array.from(formElements);
    const [removed] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, removed);

    onReorder(reorderedElements);
  };

  const getColumnCount = (rowType: string) => {
    switch (rowType) {
      case "twocolumnrow":
        return 2;
      case "threecolumnrow":
        return 3;
      case "fourcolumnrow":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          ref={drop}
          style={{
            borderRadius: "20px",
            minHeight: "fitContent",
            backgroundColor: isActive ? "#E0E0E0" : "white",
            overflow: "none",
          }}
        >
          {formElements.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                border: "2px dashed #d8541a",
                borderRadius: "10px",
                height: "150px",
                width: "830px",
                position: "relative",
                left: "30px",
              }}
            >
              <span className="startBuildText">Start Building Your Form</span>
              <span className="dragDropText">
                Drag and Drop or Click Fields from Left Panel
              </span>
            </div>
          ) : (
            <Droppable droppableId="formElements">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formElements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="renderFormDiv">
                            <PreviewButton
                              className="previewButton"
                              onClick={onPreviewClick}
                            />
                            <RenderFormElement
                              key={element.id}
                              element={element}
                              onOptionChange={onOptionChange}
                              onLabelChange={onLabelChange}
                            />
                            <DeleteIcon
                              className="delteIcon"
                              onClick={() => handleDeleteClick(element.id)}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DroppableFormArea;
