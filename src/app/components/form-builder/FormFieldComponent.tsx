"use client";

import "../../styles/form-field-component.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Icons from "lucide-react";

import { Label } from "../UI/label";
import { FormField } from "@/app/lib/form-builder/types";
import { Card } from "../UI/card";
import { Button } from "../UI/button";
import { Input } from "../UI/input";
import { RadioGroup, RadioGroupItem } from "../UI/radio-group";
import { Textarea } from "../UI/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/select";
import { Checkbox } from "../UI/checkbox";

interface FormFieldComponentProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function FormFieldComponent({
  field,
  isSelected,
  onSelect,
  onDelete,
}: FormFieldComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFieldPreview = () => {
    switch (field.fieldType) {
      case "text":
      case "email":
      case "number":
      case "phone":
        return (
          <Input
            type={field.fieldType === "phone" ? "tel" : field.fieldType}
            placeholder={field.placeholder}
            disabled
          />
        );
      case "textarea":
        return <Textarea placeholder={field.placeholder} disabled rows={3} />;
      case "date":
        return <Input type="date" disabled />;
      case "select":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup disabled>
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox disabled />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </div>
        );

      case "file":
        return <Input type="file" disabled />;
      default:
        return <Input placeholder={field.placeholder} disabled />;
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        className={`form-field-card
          ${isSelected ? "form-field-card--selected" : "form-field-card--hover"}
          ${
            isDragging ? "form-field-card--dragging" : "form-field-card--normal"
          }
        `}
        onClick={onSelect}
      >
        <div className="form-field-content">
          <div className="form-field-content-header">
            <div className="form-field-content-info">
              <div className="form-field-content-info-label">
                <Label>
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
              </div>
              {field.properties.helpText && (
                <p className="form-field-content-info-help">
                  {field.properties.helpText}
                </p>
              )}
            </div>

            <div className="form-field-content-actions">
              <Button
                variant="ghost"
                size="icon"
                className="form-field-content-actions-drag"
                {...listeners}
              >
                <Icons.GripVertical className="h-4 w-4 text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="form-field-content-actions-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Icons.Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>{renderFieldPreview()}</div>
        </div>
      </Card>
    </div>
  );
}
