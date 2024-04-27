// FormElementsContext.tsx
import React, { ReactNode } from 'react';



// Ensure this type definition is consistent across your application
interface FormElement {
    id: string;
    type: string;
    label?: string;
    options?: string[];
    minValue?: number;
    maxValue?: number;
    category?: string; // Make category optional if it's not always required
   }
   

interface FormElementsContextProps {
 formElements: FormElement[];
 setFormElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

interface FormElementsProviderProps {
 children: ReactNode; // Define the children prop
}

const FormElementsContext = React.createContext<FormElementsContextProps | undefined>(undefined);

export const FormElementsProvider: React.FC<FormElementsProviderProps> = ({ children }) => {
 const [formElements, setFormElements] = React.useState<FormElement[]>([]);

 return (
    <FormElementsContext.Provider value={{ formElements, setFormElements }}>
      {children}
    </FormElementsContext.Provider>
 );
};

export const useFormElements = (): FormElementsContextProps => {
 const context = React.useContext(FormElementsContext);
 if (!context) {
    throw new Error('useFormElements must be used within a FormElementsProvider');
 }
 return context;
};
