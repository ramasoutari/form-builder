export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'
  | 'phone';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  fieldType: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  position: number;
  properties: {
    helpText?: string;
    defaultValue?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    multiple?: boolean;
    accept?: string;
  };
}

export interface Form {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface FieldTypeDefinition {
  type: FieldType;
  label: string;
  icon: string;
  category: 'input' | 'choice' | 'special';
}
