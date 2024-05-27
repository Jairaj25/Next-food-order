import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from "../action/mock-api-action"

const initialState = {
  loading: false,
  users: [],
  error: '',
  currentPage: 1,
  usersPerPage: 6,
};

export const mockApiSlice = createSlice({
  name: 'mockApi',
  initialState,
  reducers: {
    updateCurrentPage(state, action) {
      state.currentPage = action.payload;
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
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [action.payload];
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = '';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUserIndex = state.users.findIndex(user => user.id === action.payload.id);
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.error = '';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateCurrentPage } = mockApiSlice.actions;
export default mockApiSlice.reducer;