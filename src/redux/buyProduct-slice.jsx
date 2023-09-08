import { createSlice } from '@reduxjs/toolkit';
import {
  addProductBusketAuth,
  buyProductBusket,
  fetchCurrentUser,
  fetchProductUser,
  onDeleteProductBusket,
} from './operations';

export const buyProducSlice = createSlice({
  name: 'busket',
  initialState: [],
  reducers: {
    chancheCounterValue(state, action) {
      const { id, counter } = action.payload;
      // Знайдемо індекс об'єкта з потрібним ідентифікатором
      const index = state.findIndex(product => product._id === id);
      if (index !== -1) {
        // Знайшли об'єкт, оновлюємо значення count
        state[index].count = Number(counter);
      }
    },
  },
  extraReducers: {
    [addProductBusketAuth.fulfilled](state, action) {
      state.push(action.payload);
    },
    [fetchProductUser.fulfilled](state, action) {
      state.splice(0, state.length, ...action.payload);
    },
    [fetchCurrentUser.rejected](state) {
      state.length = 0;
    },
    [onDeleteProductBusket.fulfilled](state, action) {
      const updatedState = state.filter(pr => pr._id !== action.payload._id);
      return updatedState;
    },
    [buyProductBusket.fulfilled](state) {
      state.splice(0, state.length, null);
    },
  },
});
export const { chancheCounterValue } = buyProducSlice.actions;
