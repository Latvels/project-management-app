import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
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
      return rejectWithValue(i18n.t('errors: rejectGetTasks'));
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
      return rejectWithValue(i18n.t('errors: rejectGetTask'));
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: Task, { rejectWithValue }) => {
  // data: {
  //     "title": "test task",
  //     "description": "test task description",
  //     "userId": "f9730773-8e68-4516-84ce-3ae3d90950d1",
  //     "boardId": ,
  //      columnId: ,
  // }
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
        // resp  {
        //     "title": "test task",
        //     "order": 1,
        //     "description": "test task description",
        //     "userId": "f9730773-8e68-4516-84ce-3ae3d90950d1",
        //     "boardId": "60d6a65b-3591-4d42-9af2-eefff9fd3427",
        //     "columnId": "3c4db36a-67d5-426a-8f20-c62b2966af11",
        //     "id": "c32dcc35-9790-416b-84a1-7dba67a1306f"
        // }

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(e);
      const data = {status: error.response!.status, text: i18n.t('errors:rejectCreateTask')};
      return rejectWithValue(data);
      // return rejectWithValue(i18n.t('errors:rejectCreateTask'));
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (data: Task, { rejectWithValue }) => {
  //data {
  //     "title": "test updated task",
  //     "description": "test task description",
  //     "userId": "f9730773-8e68-4516-84ce-3ae3d90950d1",
  //     "order": 2,
  //     "boardId": "60d6a65b-3591-4d42-9af2-eefff9fd3427",
  //     "columnId": 
  // }
    const { boardId, columnId, id } = data;
    delete data.boardId;
    delete data.columnId;
    // delete data.id;
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
    //resp {
    //     "id": "94e3c906-e38a-499f-86a5-499ffcb7eadb",
    //     "title": "test updated task",
    //     "order": 2,
    //     "description": "test task description",
    //     "userId": "f9730773-8e68-4516-84ce-3ae3d90950d1",
    //     "boardId": "60d6a65b-3591-4d42-9af2-eefff9fd3427",
    //     "columnId": null
    // }
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors: rejectUpdateTask'));
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
      return rejectWithValue(i18n.t('errors: rejectDeleteTask'));
      // return rejectWithValue(t('errors:rejectDeleteTask'));
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
    }
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
      // state.taskRequestStatus = ACTION_STATUSES.REJECTED;
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
      // state.taskRequestStatus = ACTION_STATUSES.REJECTED;
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
        // state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [createTask.rejected.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload.text;
      state.error.status = action.payload.status;
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
        // state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [updateTask.rejected.type]: (state, action) => {
      state.taskRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload.text;
      state.error.status = action.payload.status;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        // state.error.message = action.payload;
        // state.error = action.error;
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
        // state.entities = action.payload;
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
