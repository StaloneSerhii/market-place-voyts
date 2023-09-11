import { createSlice } from '@reduxjs/toolkit';
import {
  addProductBusketAuth,
  fetchCurrentUser,
  fetchProductUser,
  onDeleteProductBusket,
  addMyFavorite,
  delMyFavorite,
} from './operations';

export const buyProducSlice = createSlice({
  name: 'busket',
  initialState: {
    product: [],
    myFavorite: [],
    isFetching: false,
  },
  reducers: {
    chancheCounterValue(state, action) {
      const { id, counter } = action.payload;
      // Знайдемо індекс об'єкта з потрібним ідентифікатором
      const index = state.product.findIndex(product => product._id === id);
      if (index !== -1) {
        // Знайшли об'єкт, оновлюємо значення count
        state.product[index].count = Number(counter);
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
      state.product = action.payload.productBusket;
      state.myFavorite = action.payload.idProductsFetch;
    },
    [fetchCurrentUser.rejected](state) {
      state.product = [];
    },
    [onDeleteProductBusket.pending](state) {
      state.isFetching = true;
    },
    [onDeleteProductBusket.fulfilled](state, action) {
      state.isFetching = false;
      const deletedProductId = action.payload._id;
      const updatedState = state.product.filter(
        pr => pr._id !== deletedProductId
      );
      state.product.splice(0, state.product.length, ...updatedState);
    },
    [addMyFavorite.fulfilled](state, action) {
      state.isFetching = false;
      state.myFavorite.push(action.payload);
    },
    [delMyFavorite.fulfilled](state, action) {
      state.isFetching = false;
      const deletedProductId = action.payload.idProduct;
      state.myFavorite = state.myFavorite.filter(
        pr => pr.idProduct !== deletedProductId
      );
    },
  },
});
export const { chancheCounterValue } = buyProducSlice.actions;
