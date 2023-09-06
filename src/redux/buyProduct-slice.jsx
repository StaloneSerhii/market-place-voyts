import { createSlice } from '@reduxjs/toolkit';
import { addProductBusketAuth, fetchProductUser } from './operations';

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
  },
});
