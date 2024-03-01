import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "https://65c5339adae2304e92e40df5.mockapi.io/mockapi/v1/Users";

// Fetch all users
export const fetchUsers = createAsyncThunk('mockApi/fetchUsers', async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

// Fetch user by ID
export const fetchUser = createAsyncThunk('mockApi/fetchUser', async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
});

// Create user
export const createUser = createAsyncThunk('mockApi/createUser', async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk('mockApi/updateUser', async ({ userId, userData }) => {
  const response = await axios.put(`${baseUrl}/${userId}`, userData);
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk('mockApi/deleteUser', async (userId) => {
  await axios.delete(`${baseUrl}/${userId}`);
  return userId;
});