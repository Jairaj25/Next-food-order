import { FETCH_PRODUCTS, SEARCH_PRODUCTS } from '../action/product-actions';

const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case SEARCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
