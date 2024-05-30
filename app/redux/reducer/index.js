import { combineReducers } from 'redux';
import foodReducer from './product-reducer';
import cartReducer from './cart-reducer'; 
import mockApiSlice from './mock-api-reducer';
import ordersReducer from './orders-reducer';

const rootReducer = combineReducers({
  foods: foodReducer,
  cart: cartReducer,
  mockApi: mockApiSlice,
  orders: ordersReducer
});

export default rootReducer;
