"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  DraggableField,
  FieldsSidebar,
} from "../components/form-builder/FieldsSidebar";
import { FormCanvas } from "../components/form-builder/FormCanvas";
import { PropertiesPanel } from "../components/form-builder/PropertiesPanel";
import { Button } from "../components/UI/button";
import { Save, Eye } from "lucide-react";
import { useFormBuilderStore } from "../stores/use-form";


export default function FormBuilderPage() {
  const fields = useFormBuilderStore((state) => state.fields);
  const selectedFieldId = useFormBuilderStore((state) => state.selectedFieldId);
  const activeField = useFormBuilderStore((state) => state.activeField);
  const setActiveField = useFormBuilderStore((state) => state.setActiveField);
  const addField = useFormBuilderStore((state) => state.addField);
  const selectField = useFormBuilderStore((state) => state.selectField);
  const deleteField = useFormBuilderStore((state) => state.deleteField);
  const updateField = useFormBuilderStore((state) => state.updateField);
  const reorderFields = useFormBuilderStore((state) => state.reorderFields);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;

    const activeData = event.active.data.current;
    if (activeData?.isNew) {
      setActiveField({
        id: activeId,
        fieldType: activeData.type,
        label: `New ${
          activeData.type.charAt(0).toUpperCase() + activeData.type.slice(1)
        } Field`,
        placeholder: "",
        required: false,
        options: [],
        position: 0,
        properties: {},
      });
    } else {
      const existingField = fields.find((f) => f.id === activeId) || null;
      setActiveField(existingField);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveField(null);

    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const isNewField = activeData?.isNew;

    if (isNewField && over.id === "form-canvas") {
      addField(activeData.type);
    } else if (!isNewField && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderFields(oldIndex, newIndex);
      }
    }
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Form Builder
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create beautiful forms with drag and drop
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" /> Preview
              </Button>
              <Button className="gap-2" onClick={() => console.log("saved")}>
                <Save className="w-4 h-4" /> Save Form
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <FieldsSidebar />
          <FormCanvas
            fields={fields}
            selectedFieldId={selectedFieldId}
            onSelectField={selectField}
            onDeleteField={deleteField}
          />
          <PropertiesPanel field={selectedField} onUpdateField={updateField} />
        </div>
      </div>

      <DragOverlay>
        {activeField ? (
          <DraggableField
            key={activeField.id}
            type={activeField.fieldType}
            label={activeField.label}
            icon={(activeField.properties as any).icon || "Box"}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
