import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct, fetchProductById } from './operations';

export const productReducer = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProductBusket(state, action) {
      state.push({ ...action.payload, coun: 1 });
    },
    counterSum(state, action) {
      const { even, id } = action.payload;
      console.log(action);
      return state.map(product => {
        if (product._id === id) {
          console.log(product);
          return { ...product, coun: even };
        }
        console.log(id);
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
