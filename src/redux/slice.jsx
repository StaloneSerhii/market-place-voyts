import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProductBusket(state, action) {
      state.push({ ...action.payload, coun: 1 });
    },
    counterSum(state, action) {
      const { count = 1, id } = action.payload;
      return state.map(product => {
        if (product._id === id) {
          return { ...product, coun: count };
        }
        return product;
      });
    },
    onDeleteProductBusket(state, action) {
      return state.filter(product => product._id !== action.payload);
    },
    allDeleteProductBusket(state, action) {
      return (state = []);
    },
  },
});

export const {
  addProductBusket,
  onDeleteProductBusket,
  counterSum,
  allDeleteProductBusket,
} = productReducer.actions;
