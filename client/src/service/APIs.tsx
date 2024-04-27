import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/";

// Base API slice
export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({}),
  tagTypes: ["Forms"],
});

// Form API slice
export const formApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => ({ url: "/forms", method: "GET" }),
    }),
    getFormById: builder.query({
      query: (formId) => ({ url: `/forms/${formId}`, method: "GET" }),
    }),
    createForm: builder.mutation({
      query: (formData) => ({ url: "/forms", method: "POST", body: formData }),
      invalidatesTags: ["Forms"],
    }),
    updateForm: builder.mutation({
      query: ({ formId, formData }) => ({
        url: `/forms/${formId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteForm: builder.mutation({
      query: (formId) => ({ url: `/forms/${formId}`, method: "DELETE" }),
    }),
    getFormByUniqueLink: builder.query({
      query: (uniqueLink) => ({
        url: `/forms/link/${uniqueLink}`,
        method: "GET",
      }),
    }),
  }),
});

// Fill Forms API slice
export const fillFormsApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    createFillForm: builder.mutation({
      query: (formData) => ({
        url: "/filledForms",
        method: "POST",
        body: formData,
      }),
    }),
    // Add other API endpoints as needed
  }),
});

export const {
  useGetFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
  useGetFormByUniqueLinkQuery,
} = formApi;

export const { useCreateFillFormMutation } = fillFormsApi;
