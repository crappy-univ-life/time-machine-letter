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
    getData: builder.query({
      query: () => ({
        url: 'letter',
      }),
    }),
  }),
});

export const { useGetUserTokenMutation, useGetDataQuery } = LoginApi;
