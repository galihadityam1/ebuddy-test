import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserState } from '../apis/user';
import { userApi } from '../apis/userApi';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  updateStatus: {
    loading: false,
    success: false,
    error: null,
  },
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.fetchUsers();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }: { userId: string; userData: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser(userId, userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUpdateStatus: (state) => {
      state.updateStatus = initialState.updateStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.error = null;
        state.updateStatus.success = false;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.error = action.payload as string;
      });
  },
});

export const { clearUpdateStatus } = userSlice.actions;
export default userSlice.reducer;