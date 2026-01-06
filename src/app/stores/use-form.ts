import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { FormField, FieldType } from "@/app/lib/form-builder/types";
import { DEFAULT_FIELD_PROPERTIES } from "@/app/lib/form-builder/constant";

interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
  activeField: FormField | null;

  setFieldsFromApi: (fields: FormField[]) => void;
  setActiveField: (field: FormField | null) => void;
  addField: (type: FieldType) => void;
  deleteField: (id: string) => void;
  updateField: (updates: Partial<FormField>) => void;
  selectField: (id: string | null) => void;
  reorderFields: (oldIndex: number, newIndex: number) => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set, get) => ({
  fields: [],
  selectedFieldId: null,
  activeField: null,

  setFieldsFromApi: (fields) =>
    set({
      fields: fields
        .sort((a, b) => a.position - b.position)
        .map((f, i) => ({ ...f, position: i })),
      selectedFieldId: null,
      activeField: null,
    }),

  setActiveField: (field) => set({ activeField: field }),

  addField: (type) => {
    const fields = get().fields;
    const newField: FormField = {
      id: `field-${Date.now()}`,
      fieldType: type,
      label: `New ${type[0].toUpperCase() + type.slice(1)} Field`,
      placeholder:
        (DEFAULT_FIELD_PROPERTIES as any)[type]?.placeholder || "",
      required: false,
      options: (DEFAULT_FIELD_PROPERTIES as any)[type]?.options || [],
      position: fields.length,
      properties: {
        ...(DEFAULT_FIELD_PROPERTIES as any)[type],
      },
    };

    set({
      fields: [...fields, newField],
      selectedFieldId: newField.id,
    });
  },

  deleteField: (id) => {
    const newFields = get().fields
      .filter((f) => f.id !== id)
      .map((f, i) => ({ ...f, position: i }));

    set({ fields: newFields, selectedFieldId: null });
  },

  updateField: (updates) => {
    const selectedId = get().selectedFieldId;
    if (!selectedId) return;

    set({
      fields: get().fields.map((f) =>
        f.id === selectedId ? { ...f, ...updates } : f
      ),
    });
  },

  selectField: (id) => set({ selectedFieldId: id }),

  reorderFields: (oldIndex, newIndex) => {
    const reordered = arrayMove(get().fields, oldIndex, newIndex).map(
      (f, i) => ({ ...f, position: i })
    );
    set({ fields: reordered });
  },
}));
