import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer'
import { CONFIG } from '../constants/constant';
import { File, reqState } from '../typings/typings';

export const getFile = createAsyncThunk(
  'file/getFile',
  async (data: File, { rejectWithValue }) => {
    const { taskId, file } = data;
    try {
      const response = await axios.get<File[]>(`${CONFIG.basicURL}/file/${taskId}/${file}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      })
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to get file')
    }
  }
)

export const uploadFile = createAsyncThunk(
  'file/uploadFile',
  async (data: File, { rejectWithValue }) => {
    try {
      const config = {
        method: 'POST',
        url: `${CONFIG.basicURL}/file`,
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
      return rejectWithValue('Failed to upload file')
    }
  }
)

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: { status: 0, message: '', visible: true }
}

export const fileSlise = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: {
    [getFile.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getFile.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getFile.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [uploadFile.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [uploadFile.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [uploadFile.rejected.type]: (state, action) => {
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
export default fileSlise.reducer;