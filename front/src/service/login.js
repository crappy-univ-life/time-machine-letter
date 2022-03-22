import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://3.136.98.210.:8080/user/' }),
  endpoints: (builder) => ({
    getUserToken: builder.mutation({ // get방식
      query: (code) => ({
        url: 'login',
        method: 'POST',
        body: code,
      }),
    }),

  }),
});
console.log(LoginApi.useGetTokenQuery);

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserTokenMutation } = LoginApi;
