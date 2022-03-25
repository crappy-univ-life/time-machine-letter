import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints

export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.125.226.184:8080/user/',
  }),
  endpoints: (builder) => ({
    getUserToken: builder.mutation({
      query: (code) => ({
        url: 'login',
        method: 'POST',
        body: code,
      }),
    }),

  }),
});
console.log(LoginApi);

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserTokenMutation } = LoginApi;
