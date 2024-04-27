import express, { Request, Response } from 'express';
import Form from './formModel';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Approve a form
router.post('/forms/:id/approve', async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      // { workflowState: 'approved' },
      { new: true }
    );
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error approving form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject a form
router.post('/forms/:id/reject', async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      // { workflowState: 'rejected' },
      { new: true }
    );
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save form data
router.post('/forms', async (req: Request, res: Response) => {
  console.log("Incoming request data:", req.body); // Log the incoming request data
  try {
     const { formData, workflowState, formName, formType } = req.body;
     const uniqueLink = uuidv4(); // Generate a unique link for the form
     const form = new Form({
       formData,
       formName,
       formType,
       uniqueLink,
     });
     console.log("Form data before saving:", form); // Log the form data before saving
     await form.save();
     console.log("Form data after saving:", form); // Log the form data after saving
     
     res.status(201).json(form);
  } catch (error) {
     console.error('Error saving form:', error);
     res.status(500).json({ error: 'Server error' });
  }
 });
 

// Get all forms
router.get('/forms', async (req: Request, res: Response) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single form by ID
router.get('/forms/:id', async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a form by ID
router.put('/forms/:id', async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      { formData },
      { new: true }
    );
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a form by ID
router.delete('/forms/:id', async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve a form by its unique link
router.get('/forms/link/:uniqueLink', async (req: Request, res: Response) => {
  try {
     const form = await Form.findOne({ uniqueLink: req.params.uniqueLink });
     if (!form) {
       return res.status(404).json({ error: 'Form not found' });
     }
     res.json(form);
  } catch (error) {
     console.error('Error fetching form by link:', error);
     res.status(500).json({ error: 'Server error' });
  }
});
 
export default router;