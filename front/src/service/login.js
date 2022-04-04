import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://timemachineletter.tk:8080/user/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', 'http://timemachineletter.tk:8080/');
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
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserTokenMutation } = LoginApi;
