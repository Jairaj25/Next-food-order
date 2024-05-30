import { createSlice } from "@reduxjs/toolkit";
import {fetchOrdersByUserId, createOrder} from '../action/orders-action';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
      orders: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch orders
        .addCase(fetchOrdersByUserId.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders = action.payload;
        })
        .addCase(fetchOrdersByUserId.rejected, (state, action) => {
            console.log("action", action);
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Create order
        .addCase(createOrder.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders.push(action.payload);
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default ordersSlice.reducer;