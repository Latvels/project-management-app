import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer';
import { CONFIG } from '../constants/constant';
import { Task, reqState, ACTION_STATUSES } from '../typings/typings';
import i18n from '../services/i18n';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId } = data;
    try {
      const response = await axios.get<Task[]>(
        `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/task`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${CONFIG.token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectGetTasks'));
    }
  }
);

export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    try {
      const response = await axios.get<Task[]>(
        `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/tasks/${id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${CONFIG.token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(i18n.t('errors:rejectGetTask'));
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId } = data;
    delete data.boardId;
    delete data.columnId;
    try {
      const config = {
        method: 'POST',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/tasks`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectCreateTask'));
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    delete data.boardId;
    delete data.columnId;
    delete data.id;
    try {
      const config = {
        method: 'PUT',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/tasks/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectUpdateTask'));
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (data: Task, { rejectWithValue }) => {
    const { boardId, columnId, id } = data;
    try {
      const config = {
        method: 'DELETE',
        url: `${CONFIG.basicURL}/boards/${boardId}/columns/${columnId}/tasks/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectDeleteTask'));
    }
  }
);

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: { status: 0, message: '', visible: true },
  taskRequestStatus: null,
};

export const taskSlise = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTaskRequestStatus: (state) => {
      state.taskRequestStatus = null;
    },
  },
  extraReducers: {
    [getTasks.pending.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getTasks.fulfilled.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getTasks.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [getTaskById.pending.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getTaskById.fulfilled.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getTaskById.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [createTask.pending.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createTask.fulfilled.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },
    [createTask.rejected.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.payload.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },

    [updateTask.pending.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [updateTask.fulfilled.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },
    [updateTask.rejected.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },

    [deleteTask.pending.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [deleteTask.fulfilled.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },
    [deleteTask.rejected.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.REJECTED;
      state.error.message = action.payload;
      state.error.status = action.payload.meta;
      const { requestId } = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectBoard = (state: RootState) => state.board;
export default taskSlise.reducer;
