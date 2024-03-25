import { createSlice } from '@reduxjs/toolkit';
import placeHolder from "../../../assets/pizza-image2.jpeg";

const loadCartFromStorage = () => {
  let storedCart;

  if (typeof window !== 'undefined') {
    storedCart = localStorage.getItem('cart');

    try {
      storedCart = JSON.parse(storedCart);
    } catch (error) {
      console.error('Error parsing cart from storage:', error);
      storedCart = null;
    }
  }

  if (storedCart) {
    return storedCart;
  } else {
    return { items: [{ price: 0, quantity: 0, rating: 0, restaurant: "", category: [], foodName: "", id: 0, image: {src: placeHolder, blurDataURL: "", blurHeight:0 , blurWidth: 0, height: 405, width: 612} }], total: 0, restaurant: '', image: {src: placeHolder, blurDataURL: "", blurHeight: 0, blurWidth: 0, height: 405, width: 612}, rating: '' };
    // return storedCart;
    // return { items: [{ price: 12.99, quantity: 1, rating: 4.5, restaurant: "Nepolitan", category: ['Italian', 'Pizza'], foodName: "Margherita Pizza", id: 1, image: {src:"/_next/static/media/pizza-image2.6719a785.jpeg", blurDataURL: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpizza-image2.6719a785.jpeg&w=8&q=70", blurHeight: 5, blurWidth: 8, height: 405, width: 612} }], total: 12.99, restaurant: 'Nepolitan', image: {src:"/_next/static/media/pizza-image2.6719a785.jpeg", blurDataURL: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpizza-image2.6719a785.jpeg&w=8&q=70", blurHeight: 5, blurWidth: 8, height: 405, width: 612}, rating: '' }
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
        } else {
          updatedItem.quantity -= 1;
          if (updatedItem.quantity < 0) {
            updatedItem.quantity = 0;
          }
        }

        if (updatedItem.quantity === 0) {
          updatedItems.splice(itemIndex, 1);
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
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurant = '';
      state.image = '';
      state.rating= '';

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
