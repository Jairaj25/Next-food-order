import { createAsyncThunk } from '@reduxjs/toolkit';
import FoodAxiosInstance from '../API/food-api';
import axios from 'axios';

export const fetchFoods = createAsyncThunk(
  'foods/fetchFoods',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8080/foods/search');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
