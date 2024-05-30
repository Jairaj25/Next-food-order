import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/orders';

export const fetchOrdersByUserId = createAsyncThunk(
  'orders/fetchByUserId',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/search/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData, thunkAPI) => {
      try {
        const response = await axios.post(`${baseUrl}/create`, orderData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );