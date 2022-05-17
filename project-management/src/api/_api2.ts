import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CONFIG } from '../constants/constant';
// описание API
export const defaultApi = createApi({
  reducerPath: 'defaultApi',
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.basicURL }),
  tagTypes: ['api'],
  endpoints: (build) => ({
    // Authorization
    singIn: build.query({
      query: (req) => ({
        url: `/signin`,
        method: 'POST',
        body: {
          login: req.login,
          password: req.password,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    singUp: build.query({
      query: (req) => ({
        url: `/signup`,
        method: 'POST',
        body: {
          name: req.name,
          login: req.login,
          password: req.password,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    // USER
    getUsersAll: build.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    getUserByID: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    updateUser: build.query({
      query: (req) => ({
        url: `/users/${req.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        body: req,
      }),
      providesTags: (result) => ['api'],
    }),
    updateUserMut: build.mutation({
      query: (req) => ({
        url: `/users/${req.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        body: req,
      }),
      invalidatesTags: ['api']
    }),
    deleteUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),

    // Board
    getBoards: build.query({
      query: () => ({
        url: `/boards`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    getBoardsByID: build.query({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    createBoards: build.query({
      query: (req) => ({
        url: `/boards`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          description: req.description,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    updateBoards: build.query({
      query: (req) => ({
        url: `/boards/${req.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          description: req.description,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    deleteBoards: build.query({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),

    // Columns
    getColumns: build.query({
      query: (idBoard) => ({
        url: `/boards/${idBoard}/columns`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    getColumnByID: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    createColumn: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          description: req.description,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    updateColumnByID: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          description: req.description,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    deleteColumnByID: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),

    // Task
    getAllTask: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}/task`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    getTaskByID: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}/task${req.idTask}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),
    createTask: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns${req.idColumn}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          done: req.description,
          order: req.order,
          description: req.description,
          userId: req.userId,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    updateTask: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}/task${req.idTask}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          title: req.title,
          done: req.description,
          order: req.order,
          description: req.description,
          userId: req.userId,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    deleteTask: build.query({
      query: (req) => ({
        url: `/boards/${req.idBoard}/columns/${req.idColumn}/task${req.idTask}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
      }),
      providesTags: (result) => ['api'],
    }),

    // File
    getFile: build.query({
      query: () => ({
        url: `/file`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        }
      }),
      providesTags: (result) => ['api'],
    }),
    uploadFile: build.query({
      query: (req) => ({
        url: `/file`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
        },
        data: {
          file: req,
        }
      }),
      providesTags: (result) => ['api'],
    }),


  }),
});

export const { useGetUsersAllQuery, useUpdateUserMutMutation, useUpdateUserQuery, useGetBoardsQuery, useCreateBoardsQuery } = defaultApi;