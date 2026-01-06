import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createForm, deleteForm, getAllForms, getFormFields, saveForm } from "./forms.service";
import { createFormPayload, GetOneForm, saveFormPayload } from "./forms.types";



export const useGetAllForms = () => {
  return useQuery({
    queryKey: ["all-forms"],
    queryFn: () => getAllForms(),
  });
};   


export const useGetFormFields = (queryOptions: GetOneForm) => {
  return useQuery({
    queryKey: ["form-fields", queryOptions],
    queryFn: () => getFormFields(queryOptions),
  });
};

export const useSaveForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: saveFormPayload) => saveForm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form-fields"] });
    },
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: createFormPayload) => createForm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-forms"] });
    },
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-forms"] });
    },
  });
};




