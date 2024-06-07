import { createSlice } from '@reduxjs/toolkit';
import placeHolder from "../../../assets/pizza-image2.jpeg";
import Cookies from 'js-cookie';

const COOKIE_NAME = 'cart';

const loadCartFromStorage = () => {
  let storedCart;

  if (typeof window !== 'undefined') {
    storedCart = localStorage.getItem('cart');

    try {
      storedCart = JSON.parse(storedCart);
    } catch (error) {
      storedCart = null;
    }
  }

  if (storedCart) {
    return {
      ...storedCart,
      totalQuantity: storedCart.items.reduce((total, item) => total + item.quantity, 0)
    };
  } 

  else {
    return [];
  }
};

const saveCartToStorage = (cart) => {

  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.restaurant = newItem.restaurant;
      state.image = newItem.image;

      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, increment } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItems = [...state.items];
        const updatedItem = { ...updatedItems[itemIndex] };
        if (increment) {
          updatedItem.quantity += 1;
          state.totalQuantity += 1;
        } else {
          updatedItem.quantity -= 1;
          if (updatedItem.quantity < 0) {
            updatedItem.quantity = 0;
          }
          state.totalQuantity -= 1;
          if (state.totalQuantity < 0) {
            state.totalQuantity = 0;
            state.restaurant = '';
          }
        }

        if (updatedItem.quantity === 0) {
          updatedItems.splice(itemIndex, 1);
          state.restaurant = '';
        } else {
          updatedItems[itemIndex] = updatedItem;
        }

        state.items = updatedItems;
      }

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== itemIdToRemove);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.restaurant = '';
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurant = '';
      state.image = '';
      state.rating= '';
      state.totalQuantity = 0;

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
