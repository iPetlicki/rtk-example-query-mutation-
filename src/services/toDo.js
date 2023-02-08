import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
          url: `todos`,
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
        }
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
    editToDo: builder.mutation({
      query: ({id, title}) => {
        return {
          url: `todos/${id}`,
          method: "PATCH",
          headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
          body: {title},
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: [{type: 'Todos', ID: 'List'}],
    }),
    deleteToDo: builder.mutation({
      query: (id) => {
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
    toggleIsCompleted: builder.mutation({
      query: (id) => {
        return {
          url: `todos/${id}/isCompleted`,
          method: "PATCH",
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
})

export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
  useToggleIsCompletedMutation,
  useEditToDoMutation
} = toDoApi
