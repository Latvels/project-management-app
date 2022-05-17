import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer';
import { CONFIG } from '../constants/constant';
import { Column, reqState } from '../typings/typings';

export const getColumns = createAsyncThunk(
  'column/getColumns',
  async (idBoard: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Column[]>(`${CONFIG.basicURL}/boards/${idBoard}/columns`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load columns');
    }
  }
);

export const getColumnById = createAsyncThunk(
  'column/getColumnById',
  async (data: Column, { rejectWithValue }) => {
    const { idBoard, id } = data;
    try {
      const response = await axios.get<Column[]>(
        `${CONFIG.basicURL}/boards/${idBoard}/columns/${id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${CONFIG.token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load columns by id');
    }
  }
);

export const createColumn = createAsyncThunk(
  'column/createColumn',
  async (data: Column, { rejectWithValue }) => {
    const { idBoard } = data;
    delete data.idBoard;
    try {
      const config = {
        method: 'POST',
        url: `${CONFIG.basicURL}/boards/${idBoard}/columns`,
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
      return rejectWithValue('Failed to create column');
    }
  }
);

export const updateColumn = createAsyncThunk(
  'column/updateColumn',
  async (data: Column, { rejectWithValue }) => {
    const { idBoard, id } = data;
    delete data.idBoard;
    delete data.id;
    try {
      const config = {
        method: 'PUT',
        url: `${CONFIG.basicURL}/boards/${idBoard}/columns/${id}`,
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
      return rejectWithValue('Failed to change column');
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async (data: Column, { rejectWithValue }) => {
    const { idBoard, id } = data;
    try {
      const config = {
        method: 'DELETE',
        url: `${CONFIG.basicURL}/boards/${idBoard}/columns/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue('Failed to delete column');
    }
  }
);

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const columnSlise = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: {
    [getColumns.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getColumns.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getColumns.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [getColumnById.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getColumnById.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getColumnById.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [createColumn.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createColumn.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [createColumn.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [updateColumn.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [updateColumn.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [updateColumn.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [deleteColumn.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [deleteColumn.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [deleteColumn.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectBoard = (state: RootState) => state.board;
export default columnSlise.reducer;
