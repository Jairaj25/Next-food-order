import axios from 'axios';

const FoodAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default FoodAxiosInstance;
