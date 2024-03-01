import { foods } from "../../../sample_data/foods";
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
    payload: foods,
  };
};
