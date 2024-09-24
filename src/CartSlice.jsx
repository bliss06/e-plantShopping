import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.quantity * item.cost,
        0
      );
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const index = state.items.findIndex((item) => item.name === name);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.quantity * item.cost,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);

      if (item) {
        item.quantity = quantity;
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.quantity * item.cost,
        0
      );
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
