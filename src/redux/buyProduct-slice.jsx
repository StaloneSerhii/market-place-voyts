import { createSlice } from '@reduxjs/toolkit';
import {
  addProductBusketAuth,
  fetchCurrentUser,
  fetchProductUser,
  onDeleteProductBusket,
} from './operations';

export const buyProducSlice = createSlice({
  name: 'busket',
  initialState: {
    product: [],
    isFetching: false,
  },
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
      state.isFetching = false;

      state.product.push(action.payload);
    },
    [fetchProductUser.fulfilled](state, action) {
      state.isFetching = false;
      state.product.splice(0, state.product.length, ...action.payload);
    },
    [fetchCurrentUser.rejected](state) {
      state.product.length = 0;
    },
    [onDeleteProductBusket.pending](state) {
      state.isFetching = true;
    },
    [onDeleteProductBusket.fulfilled](state, action) {
      state.isFetching = false;
      const updatedState = state.product.filter(
        pr => pr._id !== action.payload._id
      );
      return updatedState;
    },
    [onDeleteProductBusket.fulfilled](state, action) {
      state.isFetching = false;
      const deletedProductId = action.payload._id;
      const updatedState = state.product.filter(
        pr => pr._id !== deletedProductId
      );
      state.product.splice(0, state.product.length, ...updatedState);
    },
  },
});
export const { chancheCounterValue } = buyProducSlice.actions;
