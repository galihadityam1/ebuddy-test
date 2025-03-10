import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../apis/userApi';
import { User, UpdateUserPayload, UpdateUserData } from '../apis/user';

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

export const updateUser = createAsyncThunk<
  User,
  { userId: string; userData: UpdateUserData },
  { rejectValue: string }
>('users/updateUser', async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await userApi.updateUser(userId, userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});