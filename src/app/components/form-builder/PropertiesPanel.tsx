'use client';

import '../../styles/properties-panel.scss';
import { Input } from "../UI/input";
import { Label } from "../UI/label";
import { Settings, Plus, X } from "lucide-react";
import { FieldOption, FormField } from "@/app/lib/form-builder/types";
import { Button } from "../UI/button";
import { Card } from "../UI/card";
import { Textarea } from "../UI/textarea";
import { Switch } from "../UI/switch";
import { Separator } from '../UI/Separator';

interface PropertiesPanelProps {
  field: FormField | null;
  onUpdateField: (updates: Partial<FormField>) => void;
}

export function PropertiesPanel({ field, onUpdateField }: PropertiesPanelProps) {
  if (!field) {
    return (
      <div className="properties-panel__empty">
        <div className="properties-panel__empty-icon">
          <Settings />
        </div>
        <h3 className="properties-panel__empty-title">No Field Selected</h3>
        <p className="properties-panel__empty-description">
          Select a field from the canvas to edit its properties
        </p>
      </div>
    );
  }

  const hasOptions = ["select", "radio", "checkbox"].includes(field.fieldType);

  const addOption = () => {
    const newOptions = [...(field.options || []), {
      label: `Option ${(field.options?.length || 0) + 1}`,
      value: `option${(field.options?.length || 0) + 1}`,
    }];
    onUpdateField({ options: newOptions });
  };

  const updateOption = (index: number, updates: Partial<FieldOption>) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = { ...newOptions[index], ...updates };
    onUpdateField({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = field.options?.filter((_, i) => i !== index) || [];
    onUpdateField({ options: newOptions });
  };

  return (
    <div className="properties-panel">
      <div className="properties-panel__header">
        <div className="properties-panel__header-icon">
          <Settings />
        </div>
        <div>
          <h2 className="properties-panel__header-title">Field Properties</h2>
          <p className="properties-panel__header-description">Customize the selected field</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="properties-panel__card">
          <div className="space-y-2">
            <Label htmlFor="label" className="properties-panel__card-input-label">Label</Label>
            <Input id="label" value={field.label} onChange={(e) => onUpdateField({ label: e.target.value })} placeholder="Field label" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeholder" className="properties-panel__card-input-label">Placeholder</Label>
            <Input id="placeholder" value={field.placeholder || ""} onChange={(e) => onUpdateField({ placeholder: e.target.value })} placeholder="Placeholder text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="helpText" className="properties-panel__card-input-label">Help Text</Label>
            <Textarea id="helpText" value={field.properties.helpText || ""} onChange={(e) => onUpdateField({ properties: { ...field.properties, helpText: e.target.value } })} placeholder="Additional help text" rows={2} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="required" className="properties-panel__card-input-label">Required Field</Label>
              <p className="text-xs text-gray-500">User must fill this field</p>
            </div>
            <Switch id="required" checked={field.required} onCheckedChange={(checked) => onUpdateField({ required: checked })} />
          </div>
        </Card>

        {hasOptions && (
          <Card className="properties-panel__card">
            <div className="flex items-center justify-between">
              <h3 className="properties-panel__card-section-title">Options</h3>
              <Button onClick={addOption} size="sm" variant="outline" className="properties-panel__card-button-add">
                <Plus />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="properties-panel__card-flex-gap">
                  <Input value={option.label} onChange={(e) => updateOption(index, { label: e.target.value })} placeholder="Label" className="flex-1" />
                  <Input value={option.value} onChange={(e) => updateOption(index, { value: e.target.value })} placeholder="Value" className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={() => removeOption(index)} className="properties-panel__card-button-remove">
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
