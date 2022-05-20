import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import qs from 'qs';
import { RootState } from '../store/reducer/reducer'
import { CONFIG } from '../constants/constant';
import { User, reqState } from '../typings/typings';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`${CONFIG.basicURL}/users`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      })
      console.log('response.data', response.data)
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load user')
    }
  }
)

export const getUsersById = createAsyncThunk(
  'board/getUsersById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`${CONFIG.basicURL}/users/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${CONFIG.token}`,
        },
      })
      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load user by id')
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (arr: User, { rejectWithValue }) => {
    const { id } = arr;
    delete arr.id;
    try {
      const config = {
        method: 'PUT',
        url: `${CONFIG.basicURL}/users/${id}`,
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
      return rejectWithValue('Failed to change user')
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const config = {
        method: 'DELETE',
        url: `${CONFIG.basicURL}/users/${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${CONFIG.token}`,
        }
      }
      const response = await axios(config)
      return response.data;
    } catch (e) {
      rejectWithValue(e)
      return rejectWithValue('Failed to delete user')
    }
  }
)

const initialState: reqState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: { status: 0, message: '', visible: true }
}

export const userSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getUsers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getUsers.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [getUsersById.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getUsersById.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getUsersById.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [updateUser.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [updateUser.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [updateUser.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },

    [deleteUser.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [deleteUser.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [deleteUser.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

export const selectUser = (state: RootState) => state.user;
export default userSlise.reducer;