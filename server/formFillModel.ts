import { Schema, model, Document } from 'mongoose';

interface FormData {
  id: string;
  type: string;
  value: any;
  label: string;
}

interface IForm extends Document {
  formData: FormData[];
  formName: string;
  formType: string;
  createdAt: Date;
}

const formSchema = new Schema<IForm>({
  formData: [
    {
      id: { type: String },
      type: { type: String },
      value: { type: Schema.Types.Mixed },
      label: { type: String },
    },
  ],
  formName: { type: String },
  formType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Form = model<IForm>('filled-forms', formSchema);

export default Form;