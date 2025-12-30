import { FieldTypeDefinition } from './types';

export const FIELD_TYPES: FieldTypeDefinition[] = [
  {
    type: 'text',
    label: 'Text Input',
    icon: 'Type',
    category: 'input',
  },
  {
    type: 'email',
    label: 'Email',
    icon: 'Mail',
    category: 'input',
  },
  {
    type: 'number',
    label: 'Number',
    icon: 'Hash',
    category: 'input',
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: 'Phone',
    category: 'input',
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: 'AlignLeft',
    category: 'input',
  },
  {
    type: 'date',
    label: 'Date',
    icon: 'Calendar',
    category: 'input',
  },
  {
    type: 'select',
    label: 'Select',
    icon: 'List',
    category: 'choice',
  },
  {
    type: 'radio',
    label: 'Radio Group',
    icon: 'Circle',
    category: 'choice',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: 'CheckSquare',
    category: 'choice',
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: 'Upload',
    category: 'special',
  },
];

export const DEFAULT_FIELD_PROPERTIES = {
  text: {
    placeholder: 'Enter text',
    minLength: 0,
    maxLength: 100,
  },
  email: {
    placeholder: 'Enter email',
  },
  number: {
    placeholder: 'Enter number',
    min: 0,
    max: 999999,
  },
  phone: {
    placeholder: '(555) 555-5555',
  },
  textarea: {
    placeholder: 'Enter text',
    minLength: 0,
    maxLength: 500,
  },
  date: {
    placeholder: 'Select date',
  },
  select: {
    placeholder: 'Select an option',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  radio: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  checkbox: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  file: {
    accept: '*/*',
    multiple: false,
  },
};
