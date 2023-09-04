import { createSlice } from '@reduxjs/toolkit';

export const orderReducer = createSlice({
  name: 'myOrder',
  initialState: [],
  reducers: {
    addProductOrder(state, action) {
      console.log('action', action);
      state.push({ ...action.payload });
    },
  },
});

export const { addProductOrder } = orderReducer.actions;
