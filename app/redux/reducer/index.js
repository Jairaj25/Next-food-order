import { combineReducers } from 'redux';
import productReducer from './product-reducer';
import cartReducer from './cart-reducer'; 
import mockApiSlice from "./mock-api-reducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  mockApi: mockApiSlice
});

export default rootReducer;
