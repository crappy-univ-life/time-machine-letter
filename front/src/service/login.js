import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints

export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.36.61.14:8080/user/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', 'http://3.36.61.14:8080/');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserToken: builder.mutation({
      query: (code) => ({
        url: 'login',
        method: 'POST',
        body: code,
      }),
    }),
    getData: builder.query({
      query: () => ({
        url: 'data',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserTokenMutation, useGetDataQuery } = LoginApi;
