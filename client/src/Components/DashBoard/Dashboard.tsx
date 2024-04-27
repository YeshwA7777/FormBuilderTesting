import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import "../../App.css";

interface Form {
  _id: string;
  formName: string;
  status: string;
  createdAt: string;
}

interface DashboardProps {
  forms: Form[];
}

const Dashboard: React.FC<DashboardProps> = ({ forms }) => {
  const location = useLocation();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedForms, setSelectedForms] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (forms) {
      const newSelectedForms = forms.reduce(
        (acc: { [key: string]: boolean }, form) => {
          acc[form._id] = false;
          return acc;
        },
        {}
      );
      setSelectedForms(newSelectedForms);
    }
  }, [forms]);

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSelectedForms = { ...selectedForms };
    for (const formId in newSelectedForms) {
      newSelectedForms[formId] = event.target.checked;
    }
    setSelectedForms(newSelectedForms);
    setSelectAll(event.target.checked);
  };

  const handleRowCheckboxChange =
    (formId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSelectedForms = {
        ...selectedForms,
        [formId]: event.target.checked,
      };
      setSelectedForms(newSelectedForms);

      const allSelected = Object.values(newSelectedForms).every(Boolean);
      setSelectAll(allSelected);
    };

  const handlePreviewClick = (
    form: Form,
    isFromDB = false,
    isFromDots = false
  ) => {
    // function logic
  };

  if (location.pathname === "/create-new-form") {
    return null;
  }

  return (
    <Box className="topColourBox">
      <Box className="headingBox">
        <span className="headingText">DASHBOARD</span>
        <span className="myFormsText">My Forms</span>
        <Button
          className="createFormsButton"
          sx={{
            backgroundColor: "#D8541A",
            color: "white",
            borderRadius: "5px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#D8541A",
            },
          }}
          component={Link}
          to="/create-new-form"
        >
          Create New Form
        </Button>
      </Box>
      <Box className="mainBG">
        <Box className="containerBox">
          <TableContainer className="dashboardTableContainer">
            <Table>
              <TableHead className="dashboardMainTablehead">
                <TableRow>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "100px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <Checkbox
                      checked={selectAll}
                      indeterminate={
                        !selectAll && Object.values(selectedForms).some(Boolean)
                      }
                      onChange={handleSelectAllChange}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "300px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    Form Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "300px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "300px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    Last Update
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "300px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {forms?.map((form, index) => (
                  <TableRow
                    key={form._id}
                    className="tableHeadings"
                    sx={{
                      borderBottom: "none",
                      backgroundColor: index % 2 === 0 ? "white" : "#FBFBFB",
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedForms[form._id] || false}
                        onChange={handleRowCheckboxChange(form._id)}
                      />
                    </TableCell>
                    <TableCell>{form.formName}</TableCell>
                    <TableCell>{form.status}</TableCell>
                    <TableCell>
                      {new Date(form.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handlePreviewClick(form, true)}
                      >
                        <DeleteIcon /> 
                      </IconButton>
                      <IconButton>
                         <EditIcon /> 
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Dashboard;
