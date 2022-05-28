import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer';
import { CONFIG } from '../constants/constant';
import { User, reqState, ACTION_STATUSES, Error } from '../typings/typings';
import i18n from '../services/i18n';

export const singIn = createAsyncThunk('auth/singIn', async (arr: User, { rejectWithValue }) => {
  try {
    const config = {
      method: 'POST',
      url: `${CONFIG.basicURL}/signin`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(arr),
    };
    const response = await axios(config);
    // console.log(response.data);
    return response.data;
  } catch (e) {
    rejectWithValue(e);
    return rejectWithValue(i18n.t('errors:AnErrorHasOccurred'));
  }
});

export const singUp = createAsyncThunk('auth/singUp', async (arr: User, { rejectWithValue }) => {
  try {
    const config = {
      method: 'POST',
      url: `${CONFIG.basicURL}/signup`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(arr),
    };
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (e) {
    rejectWithValue(e);
    return rejectWithValue(i18n.t('errors:ThisUserWasNotFound'));
  }
});

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  signInStatus: null,
  signUpStatus: null,
  currentRequestId: undefined,
  error: { status: 0, message: '', visible: true },
};

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStatuses: (state) => {
      state.signInStatus = null;
      state.signUpStatus = null;
    },
  },
  extraReducers: {
    [singIn.pending.type]: (state, action) => {
      state.signInStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [singIn.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      state.signInStatus = ACTION_STATUSES.FULFILLED;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [singIn.rejected.type]: (state, action) => {
      state.signInStatus = ACTION_STATUSES.REJECTED;
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        action.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [singUp.pending.type]: (state, action) => {
      state.signUpStatus = ACTION_STATUSES.PENDING;
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [singUp.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      state.signUpStatus = ACTION_STATUSES.FULFILLED;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [singUp.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      state.signUpStatus = ACTION_STATUSES.REJECTED;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        action.error.message = action.payload;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectBoard = (state: RootState) => state.board;
export default authSlise.reducer;
