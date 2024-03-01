export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (item) => {
    console.log('Action - addToCart', item);
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const updateQuantity = (itemId, increment) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { itemId, increment },
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};
