import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer'
import { CONFIG } from '../constants/constant';
import { Task, reqState } from '../typings/typings';

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId } = data;
    try {
      const response = await axios.get<Task[]>(`${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/task`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      })
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load tasks')
    }
  }
)

export const getTaskById = createAsyncThunk(
  'task/getTaskById',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    try {
      const response = await axios.get<Task[]>(`${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/task${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      })
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load tasks by id')
    }
  }
)

export const createTask = createAsyncThunk(
  'task/createTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId } = data;
    delete data.boardId;
    delete data.columnId;
    try {
      const config = {
        method: 'POST',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns${columnId}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data),
      }
      const response = await axios(config)
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to create task')
    }
  }
)

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    delete data.boardId;
    delete data.columnId;
    delete data.id;
    try {
      const config = {
        method: 'PUT',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/task${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data),
      }
      const response = await axios(config)
      return response.data;
    } catch (e) {
      rejectWithValue(e)
      return rejectWithValue('Failed to change task')
    }
  }
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    try {
      const config = {
        method: 'DELETE',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/task${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${CONFIG.token}`,
        }
      }
      const response = await axios(config)
      return response.data;
    } catch (e) {
      rejectWithValue(e)
      return rejectWithValue('Failed to delete task')
    }
  }
)

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: {}
}

export const taskSlise = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasks.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getTasks.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getTasks.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [getTaskById.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getTaskById.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getTaskById.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [createTask.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [createTask.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [createTask.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [updateTask.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [updateTask.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [updateTask.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [deleteTask.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [deleteTask.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [deleteTask.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

export const selectBoard = (state: RootState) => state.board;
export default taskSlise.reducer;