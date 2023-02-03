// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const toDoApi = createApi({
  reducerPath: "toDoApi",
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://first-node-js-app-r.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => {
        return {
          url: `todos?isCompleted=false`,
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
        };
      },
      providesTags: (result) =>
          result
              ? [
                ...result.map(({ ID }) => ({ type: 'Todos', ID })),
                { type: 'Todos', ID: 'LIST' },
              ]
              : [{ type: 'Todos', ID: 'LIST' }],
    }),
    createToDo: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `todos`,
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
          body: body,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: [{type: 'Todos', ID: 'List'}],
    }),
    deleteToDo: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `todos/${id}`,
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: [{type: 'Todos', ID: 'List'}],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
} = toDoApi;
