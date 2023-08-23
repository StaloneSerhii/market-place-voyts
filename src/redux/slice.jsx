import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProductBusket(state, action) {
      state.push({ ...action.payload, counter: 1 });
    },
    counterSum(state, action) {
      const { id, counter } = action.payload;
      return state.map(product => {
        if (product.id === id) {
          return { ...product, counter };
        }
        return product;
      });
    },
    onDeleteProductBusket(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addProductBusket, onDeleteProductBusket, counterSum } =
  productReducer.actions;
