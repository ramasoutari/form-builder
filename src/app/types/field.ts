type FieldType = "text" | "number" | "email" | "select" | "checkbox" | "date" |"textarea" |"radio" |"file" |"phone";

type Field = {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
};
