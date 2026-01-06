export const apiUrl = "http://localhost:3000";
export const endpoints = {
  auth: {
    login: `${apiUrl}/auth/login`,
  },
  forms: {
    getAllForms: `${apiUrl}/forms`,
    createForm: `${apiUrl}/forms/create`,
    deleteForm: (id: string) => `${apiUrl}/forms/${id}`,
    getForm: (id: string) => `${apiUrl}/forms/${id}`,
    saveForm: `${apiUrl}/forms/save`,
  },
};
