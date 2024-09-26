import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../interface/user';

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>('/api/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;