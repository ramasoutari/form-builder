import { create } from "zustand";
import { endpoints } from "../endpoints";
import { createFormPayload, GetOneForm, saveFormPayload } from "./forms.types";
import axios from "axios";

export const getAllForms = async () => {
  const response = await axios.get(endpoints.forms.getAllForms);
  return response.data;
};

export const getFormFields = async ({ id }: GetOneForm) => {
  const response = await axios.get(endpoints.forms.getForm(id));
  return response.data;
};

export const saveForm = async ({
  payload,
  headers,
}: saveFormPayload): Promise<any> => {
  const response = await axios.post(endpoints.forms.saveForm, payload, {
    headers: headers,
  });

  return response.data.data;
};

export const createForm = async ({
  payload,
  headers,
}: createFormPayload): Promise<any> => {
  const response = await axios.post(endpoints.forms.createForm, payload, {
    headers: headers,
  });

  return response.data.data;
};

export const deleteForm = async (id: string): Promise<any> => {
  const response = await axios.delete(endpoints.forms.deleteForm(id));
  return response.data.data;
};
