"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Plus,
  LogOut,
  Loader2,
  Trash2,
  Edit3,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/UI/button";
import { Card } from "../components/UI/card";
import { Input } from "../components/UI/input";
import { useAuth } from "../context/authContext";
import {
  useCreateForm,
  useDeleteForm,
  useGetAllForms,
} from "../api/forms/forms.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../components/UI/alert-dialog";

interface Form {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  field_count?: number;
}

export default function FormsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: forms, isLoading } = useGetAllForms();
  const createForm = useCreateForm();
  const deleteForm = useDeleteForm();
  const [isCreating, setIsCreating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [newFormName, setNewFormName] = useState("");
  const [showNewFormInput, setShowNewFormInput] = useState(false);

  const handleCreateForm = async () => {
    if (!newFormName.trim()) {
      toast.error("Please enter a form name");
      return;
    }

    setIsCreating(true);
    try {
      const payload = {
        name: newFormName,
      };
      const response = await createForm.mutateAsync({
        payload,
      });

      setNewFormName("");
      setShowNewFormInput(false);
      toast.success("Form created successfully!");
      router.push(`/forms/${response.data.id}`);
    } catch (error: any) {
      toast.error("Failed to create form");
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteForm = async () => {
    if (!selectedFormId) return;

    try {
      await deleteForm.mutateAsync(
        selectedFormId,
      );

      setDeleteDialogOpen(false);
      setSelectedFormId(null);
      toast.success("Form deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete form");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Forms
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Forms
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {forms?.length} form{forms?.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            onClick={() => setShowNewFormInput(!showNewFormInput)}
            className="gap-2"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            New Form
          </Button>
        </div>

        {showNewFormInput && (
          <Card className="p-6 mb-8 border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
            <div className="flex gap-3">
              <Input
                placeholder="Enter form name..."
                value={newFormName}
                onChange={(e) => setNewFormName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateForm()}
                autoFocus
                className="flex-1"
              />
              <Button
                onClick={handleCreateForm}
                disabled={isCreating || !newFormName.trim()}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewFormInput(false);
                  setNewFormName("");
                }}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : forms?.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No forms yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first form to get started
            </p>
            <Button onClick={() => setShowNewFormInput(true)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create First Form
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form: any) => (
              <Card
                key={form.id}
                className="p-6 hover:shadow-lg transition-all group hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
                onClick={() => router.push(`/forms/${form.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800 dark:group-hover:to-blue-700 transition-all">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/forms/${form.id}`);
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFormId(form.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {form.name}
                </h3>
                {form.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {form.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  Created{" "}
                  {new Date(form.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Form</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this form? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteForm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
