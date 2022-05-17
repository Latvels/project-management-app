import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer'
import { CONFIG } from '../constants/constant';
import { Board, reqState } from '../typings/typings';

export const getBoards = createAsyncThunk(
	'board/getBoards',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<Board[]>(`${CONFIG.basicURL}/boards`, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${CONFIG.token}`,
					},
			})
			return response.data;
		} catch (e) {
			return rejectWithValue('Failed to load board')
		}
	}
)

export const getBoardsById = createAsyncThunk(
	'board/getBoardsById',
	async (id:string, { rejectWithValue }) => {
		try {
			const response = await axios.get<Board[]>(`${CONFIG.basicURL}/boards/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${CONFIG.token}`,
					},
			})
			return response.data;
		} catch (e) {
			return rejectWithValue('Failed to load boards by id')
		}
	}
)

export const createBoard = createAsyncThunk(
	'board/createBoard',
	async (arr: Board, { rejectWithValue }) => {
		try {
			const config = {
				method: 'POST',
				url: `${CONFIG.basicURL}/boards`,
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
			return rejectWithValue('Failed to create board')
		}
	}
)

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
			return rejectWithValue('Failed to change board')
		}
	}
)

export const deleteBoard = createAsyncThunk(
	'board/deleteBoard',
	async (id: string, { rejectWithValue }) => {
		try {
			const config = {
				method: 'DELETE',
				url: `${CONFIG.basicURL}/boards/${id}`,
				headers: { 
					'Accept': 'application/json',
					'Authorization': `Bearer ${CONFIG.token}`, 
				}
			}
			const response = await axios(config)
			return response.data;
		} catch (e) {
			rejectWithValue(e)
			return rejectWithValue('Failed to delete board')
		}
	}
)

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const boardSlise = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: {
		[getBoards.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getBoards.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getBoards.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [getBoardsById.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getBoardsById.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getBoardsById.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
		
		[createBoard.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [createBoard.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [createBoard.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

		[updateBoards.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [updateBoards.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [updateBoards.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

		[deleteBoard.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [deleteBoard.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [deleteBoard.rejected.type]: (state, action) => {
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
export default boardSlise.reducer;