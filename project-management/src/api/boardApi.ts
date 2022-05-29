import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer';
import { CONFIG } from '../constants/constant';
import { ACTION_STATUSES, Board, reqState } from '../typings/typings';
import i18n from '../services/i18n';
import stateReducer from '../store/reducer/awtorizateUserDataState';
import { ConstructionOutlined } from '@mui/icons-material';

export const getBoards = createAsyncThunk('board/getBoards', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Board[]>(`${CONFIG.basicURL}/boards`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    return response.data;
  } catch (e) {
    rejectWithValue(e);
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
  //   {
  //     "id": "60d6a65b-3591-4d42-9af2-eefff9fd3427",
  //     "title": "my test board",
  //     "description": "don't delete this board please",
  //     "columns": []
  // }
    } catch (e) {
      rejectWithValue(e);
    	return rejectWithValue(i18n.t('errors:rejectGetBoard'));
  }
});

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (arr: Board, { rejectWithValue }) => {
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
      return response.data;
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
      await axios(config);
      dispatch(boardSlise.actions.deleteBoard(id));
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
  currentBoard: {},
  currentTask: {},
  currentColumn: {},
};

export const boardSlise = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
    setBoards: (state, action) => {
      state.entities = action.payload;
    },
    setBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    setColumn: (state, action) => {
      state.currentBoard!.columns!.push(action.payload);
    },
    setTask: (state, action) => {
      state.currentBoard!.columns![0].tasks!.push(action.payload);
    },
    deleteBoard: (state, action) => {
      state.entities = state.entities.filter((item: Board) => item.id !== action.payload)
    },
    resetBoardRequestStatus: (state) => {
      state.boardRequestStatus = null;
    },
    removeTask: (state, action) => {
      const columnIndex = state.currentBoard!.columns!.findIndex(item => item.id === action.payload.columnId);
      const newTasks = state.currentBoard!.columns![columnIndex]!.tasks!.filter(item => item.id !== action.payload.id);
      state.currentBoard!.columns![columnIndex]!.tasks! = newTasks;
    },
    changeTask: (state, action) => {
      const columnIndex = state.currentBoard!.columns!.findIndex(item => item.id === action.payload.columnId);
      const taskIndex = state.currentBoard!.columns![columnIndex]!.tasks!.findIndex(item => item.id === action.payload.id);
      state.currentBoard!.columns![columnIndex]!.tasks![taskIndex]! = action.payload;
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
      state.entities = action.payload;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        // state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getBoards.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      state.entities = [];
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
      state.currentBoard = action.payload;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        // state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [getBoardsById.rejected.type]: (state, action) => {
      state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.currentBoard = {};
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.currentBoard = {};
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
      state.entities.push(action.payload);
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
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
        // state.error.message = action.payload;
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
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [updateBoards.rejected.type]: (state, action) => {
      // state.boardRequestStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      state.error.message = action.payload;
      state.error.status = action.meta.requestStatus;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error.message = action.payload;
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
        // state.entities = action.payload;
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
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectBoard = (state: RootState) => state.board;
export default boardSlise.reducer;
