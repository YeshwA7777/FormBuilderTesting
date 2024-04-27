import mongoose, { Document, Schema } from 'mongoose';

interface IForm extends Document {
  formData: any[];
  formName: string;
  formType: string;
  uniqueLink: string; // Add the uniqueLink field
  createdAt: Date;
}

const formSchema = new Schema({
  formData: { type: Array },
  formName: { type: String },
  formType: { type: String },
  uniqueLink: { type: String, unique: true }, // Add the uniqueLink field
  createdAt: { type: Date, default: Date.now },
});

const Form = mongoose.model<IForm>('saved-forms', formSchema);

export default Form;