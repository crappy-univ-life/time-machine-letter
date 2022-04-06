import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LetterApi = createApi({
  reducerPath: 'LetterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://timemachineletter.tk:8080/letter/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', 'http://3.36.61.14:8080/');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLetterList: builder.query({
      query: () => ({
        url: '/',
      }),
    }),
    getSingleLetter: builder.query({
      query: () => ({
        url: '/{hash}',
      }),
    }),
    postLetter: builder.mutation({
      query: (code) => ({
        url: '/',
        method: 'POST',
        body: code,
      }),
    }),
    deleteLetter: builder.mutation({
      query: () => ({
        url: '/',
        method: 'DELETE',
      }),
    }),
    updateLetter: builder.mutation({
      query: (code) => ({
        url: '/',
        method: 'PUT',
        body: code,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSingleLetterQuery,
  useGetLetterListQuery,
  usePostLetterMutation,
  useDeleteLetterMutation,
  useUpdateLetterMutation,
} = LetterApi;
