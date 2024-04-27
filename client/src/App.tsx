import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/DashBoard/Dashboard'; 
import CreateNewForm from './Components/CreateNewForm/CreateNewForm'; 
import FormBuilder from './Components/FormCreation/FormBuilder'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGetFormsQuery } from './service/APIs';
import PublishForm from './Components/PublishForm/PublishForm';
import FormPreview from './Components/FormPreview/FormPreview';
import FormSubmission from './Components/FormSubmission/FormSubmission';

interface FormData {
 id: string;
 name: string;
}

function App() {
 const { data: forms } = useGetFormsQuery({});

 return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard forms={forms} />} />
        <Route path="/create-new-form" element={<CreateNewForm />} />
        <Route path="/publish-form" element={<PublishForm />} />
        <Route path="/form-preview" element={<FormPreview />} />
        <Route path="/forms/link/:uniqueLink" Component={FormSubmission} />
        <Route path="/form-builder" element={
          <DndProvider backend={HTML5Backend}>
            <FormBuilder />
          </DndProvider>
        } />
      </Routes>
    </Router>
 );
}

export default App;
