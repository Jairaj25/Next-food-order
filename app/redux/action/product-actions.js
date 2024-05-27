import { foods } from "../../../sample_data/foods";
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
    payload: foods,
  };
};


export const searchProducts = (searchQuery) => {
  return {
    type: SEARCH_PRODUCTS,
    payload: searchQuery
      ? foods.filter(food =>
          food.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : foods,
  }
}