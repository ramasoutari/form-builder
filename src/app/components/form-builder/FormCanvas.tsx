import "../../styles/form-canvas.scss";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FileText } from "lucide-react";
import { FormField } from "@/app/lib/form-builder/types";
import { FormFieldComponent } from "./FormFieldComponent";

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (fieldId: string) => void;
  onDeleteField: (fieldId: string) => void;
}

export function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onDeleteField,
}: FormCanvasProps) {
  const { setNodeRef } = useDroppable({
    id: "form-canvas",
  });

  return (
    <div className="form-canvas-root">
      <div className="form-canvas-container">
        <div className="form-canvas-header">
          <h1 className="form-canvas-header-title">Form Canvas</h1>
          <p className="form-canvas-header-description">
            Design your form by dragging fields from the left panel
          </p>
        </div>

        <div ref={setNodeRef} className="form-canvas-dropzone">
          {fields.length === 0 ? (
            <div className="form-canvas-empty">
              <div className="form-canvas-empty-icon">
                <FileText />
              </div>
              <h3 className="form-canvas-empty-title">Your form is empty</h3>
              <p className="form-canvas-empty-description">
                Start building by dragging field types from the left sidebar to
                this canvas
              </p>
            </div>
          ) : (
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="form-canvas-fields">
                {fields.map((field) => (
                  <FormFieldComponent
                    key={field.id}
                    field={field}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => onSelectField(field.id)}
                    onDelete={() => onDeleteField(field.id)}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}
