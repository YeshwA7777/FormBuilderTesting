import express, { Request, Response } from 'express';
import Form from './formFillModel';

const router = express.Router();

router.post('/filledForms', async (req: Request, res: Response) => {
  try {
    const { formData, formName, formType } = req.body;
    const newForm = new Form({
      formData,
      formName,
      formType,
    });
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get all forms
router.get('/filledForms', async (req: Request, res: Response) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific form by ID
router.get('/filledForms/:id', async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;