import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer'
import { CONFIG } from '../constants/constant';
import { User, reqState } from '../typings/typings';

export const singIn = createAsyncThunk(
	'auth/singIn',
	async (arr: User, { rejectWithValue }) => {
		try {
			const config = {
				method: 'POST',
				url: `${CONFIG.basicURL}/signin`,
				headers: { 
					'Accept': 'application/json',
					'Authorization': `Bearer ${CONFIG.token}`, 
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: qs.stringify(arr),
			}
			const response = await axios(config)
			return response.data;
		} catch (e) {
			rejectWithValue(e)
			return rejectWithValue('Failed to singIn')
		}
	}
)

export const singUp = createAsyncThunk(
	'auth/singUp',
	async (arr: User, { rejectWithValue }) => {
		try {
			const config = {
				method: 'PUT',
				url: `${CONFIG.basicURL}/signup`,
				headers: { 
					'Accept': 'application/json',
					'Authorization': `Bearer ${CONFIG.token}`, 
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: qs.stringify(arr),
			}
			const response = await axios(config)
			return response.data;
		} catch (e) {
			rejectWithValue(e)
			return rejectWithValue('Failed to singUp')
		}
	}
)

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
		[singIn.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [singIn.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [singIn.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [singUp.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [singUp.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [singUp.rejected.type]: (state, action) => {
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
export default authSlise.reducer;