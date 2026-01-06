"use client";

import "../../styles/fields-sidebar.scss";
import { useDraggable } from "@dnd-kit/core";
import * as Icons from "lucide-react";
import { Card } from "../UI/card";
import { FIELD_TYPES } from "@/app/lib/form-builder/constant";
import { FieldType } from "@/app/lib/form-builder/types";

interface DraggableFieldProps {
  type: FieldType;
  label: string;
  icon: string;
}

export function DraggableField({ type, label, icon }: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `field-type-${type}`,
    data: { type, isNew: true },
  });

  const IconComponent = (Icons as any)[icon] || Icons.Box;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`draggable-field ${isDragging ? "dragging" : ""}`}
    >
      <Card className="draggable-field-card">
        <div className="flex items-center gap-3">
          <div className="draggable-field-card-icon">
            <IconComponent />
          </div>
          <span className="draggable-field-card-label">{label}</span>
        </div>
      </Card>
    </div>
  );
}

export function FieldsSidebar() {
  const inputFields = FIELD_TYPES.filter((f) => f.category === "input");
  const choiceFields = FIELD_TYPES.filter((f) => f.category === "choice");
  const specialFields = FIELD_TYPES.filter((f) => f.category === "special");

  return (
    <div className="fields-sidebar">
      <div className="fields-sidebar__header">
        <h2 className="fields-sidebar__header-title">Form Builder</h2>
        <p className="fields-sidebar__header-description">
          Drag fields to the canvas
        </p>
      </div>

      <div className="fields-sidebar__section">
        <h3 className="fields-sidebar__section-title">Input Fields</h3>
        <div className="fields-sidebar__section-list">
          {inputFields.map((field) => (
            <DraggableField
              key={field.type}
              type={field.type}
              label={field.label}
              icon={field.icon}
            />
          ))}
        </div>

        <h3 className="fields-sidebar__section-title">Choice Fields</h3>
        <div className="fields-sidebar__section-list">
          {choiceFields.map((field) => (
            <DraggableField
              key={field.type}
              type={field.type}
              label={field.label}
              icon={field.icon}
            />
          ))}
        </div>

        <h3 className="fields-sidebar__section-title">Special Fields</h3>
        <div className="fields-sidebar__section-list">
          {specialFields.map((field) => (
            <DraggableField
              key={field.type}
              type={field.type}
              label={field.label}
              icon={field.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
