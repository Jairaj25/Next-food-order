import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFoods = createAsyncThunk(
  'foods/fetchFoods',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const response = await axios.get('http://localhost:8080/foods/search', config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
