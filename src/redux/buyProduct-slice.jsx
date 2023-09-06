import { createSlice } from '@reduxjs/toolkit';
import { addProductBusketAuth, fetchProductUser,onDeleteProductBusket } from './operations';

export const buyProducSlice = createSlice({
  name: 'busket',
  initialState: [],
  extraReducers: {
    [addProductBusketAuth.fulfilled](state, action) {
      state.push(action.payload);
    },
    [fetchProductUser.fulfilled](state, action) {
      state.splice(0, state.length, ...action.payload);
    },
    [onDeleteProductBusket.fulfilled](state, action) {
      const updatedState = state.filter(pr => pr._id !== action.payload._id);
      return updatedState;
    },
  },
});
