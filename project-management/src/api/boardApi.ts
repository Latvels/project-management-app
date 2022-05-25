import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer';
import { CONFIG } from '../constants/constant';
import { ACTION_STATUSES, Board, reqState } from '../typings/typings';
import i18n from '../services/i18n';

export const getBoards = createAsyncThunk('board/getBoards', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get<Board[]>(`${CONFIG.basicURL}/boards`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    dispatch(boardSlise.actions.setBoards(response.data));
  } catch (e) {
    rejectWithValue(e);
    // return rejectWithValue(i18n.t('errors: rejectGetBoards'));
    return rejectWithValue(i18n.t('errors:rejectGetBoards'))
  }
});

export const getBoardsById = createAsyncThunk(
  'board/getBoardsById',
  async (id: string, { rejectWithValue }) => {
    try {
    const response = await axios.get<Board[]>(`${CONFIG.basicURL}/boards/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    return response.data;
    } catch (e) {
      rejectWithValue(e);
    	return rejectWithValue(i18n.t('errors:rejectGetBoard'));
  }
});

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (arr: Board, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        method: 'POST',
        url: `${CONFIG.basicURL}/boards`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(arr),
      };
      const response = await axios(config);
      dispatch(boardSlise.actions.addBoard(response.data));
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectCreateBoard'));
    }
  }
);

export const updateBoards = createAsyncThunk(
  'board/updateBoards',
  async (arr: Board, { rejectWithValue }) => {
    const { id } = arr;
    delete arr.id;
    try {
      const config = {
        method: 'PUT',
        url: `${CONFIG.basicURL}/boards/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(arr),
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectUpdateBoard'));
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        method: 'DELETE',
        url: `${CONFIG.basicURL}/boards/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      };
      const response = await axios(config);
      dispatch(boardSlise.actions.deleteBoard(id));
      return response.data;
    } catch (e) {
      rejectWithValue(e);
      return rejectWithValue(i18n.t('errors:rejectDeleteBoard'));
    }
  }
);

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  boardRequestStatus: null,
  currentRequestId: undefined,
  error: { status: 0, message: '', visible: true },
};

export const boardSlise = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.entities = action.payload;
    },
    deleteBoard: (state, action) => {
      state.entities = state.entities.filter((item: Board) => item.id !== action.payload)
    },
    resetBoardRequestStatus: (state) => {
      state.boardRequestStatus = null;
    },
    addBoard: (state, action) => {
      state.entities.push(action.payload);
    }
  },
  extraReducers: {
    [getBoards.pending.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getBoards.fulfilled.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getBoards.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        action.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [getBoardsById.pending.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getBoardsById.fulfilled.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getBoardsById.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [createBoard.pending.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createBoard.fulfilled.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        // state.entities = action.payload;
        // state.entities.push(action.payload);
        state.currentRequestId = undefined;
      }
    },
    [createBoard.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [updateBoards.pending.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [updateBoards.fulfilled.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        // state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [updateBoards.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [deleteBoard.pending.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [deleteBoard.fulfilled.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.FULFILLED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [deleteBoard.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectBoard = (state: RootState) => state.board;
export default boardSlise.reducer;
