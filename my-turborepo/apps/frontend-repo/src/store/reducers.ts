import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from './actions';
import { User } from '../apis/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  updateStatus: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };
}

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