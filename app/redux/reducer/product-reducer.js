import { createSlice } from '@reduxjs/toolkit';
import { fetchFoods } from '../action/product-actions';

const foodSlice = createSlice({
  name: 'foods',
  initialState: {
    foods: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default foodSlice.reducer;
