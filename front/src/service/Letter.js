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
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getLetterList: builder.query({
      query: () => ({
        url: '/',
      }),
      providesTags: ['Post'],
    }),
    postLetter: builder.mutation({
      query: (code) => ({
        url: '/',
        method: 'POST',
        body: code,
      }),
      invalidatesTags: ['Post'],
    }),
    getSingleLetter: builder.query({
      query: (hash) => ({
        url: `/${hash}`,
      }),
    }),
    deleteLetter: builder.mutation({
      query: (hash) => ({
        url: `/${hash}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    updateLetter: builder.mutation({
      query: (code, hash) => ({
        url: `/${hash}`,
        method: 'PUT',
        body: code,
      }),
      invalidatesTags: ['Post'],
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
