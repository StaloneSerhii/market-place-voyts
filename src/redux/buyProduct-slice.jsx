import { createSlice } from '@reduxjs/toolkit';
import {
  addProductBusketAuth,
  fetchCurrentUser,
  fetchProductUser,
  onDeleteProductBusket,
  addMyFavorite,
  delMyFavorite,
  logOut,
  getHistoryProduct,
} from './operations';
import Notiflix from 'notiflix';

export const buyProducSlice = createSlice({
  name: 'busket',
  initialState: {
    product: [],
    myFavorite: [],
    history: [],
    userPr: {
      product: [],
      history: [],
      myFavorite: [],
      myStore: [],
    },
    isFetching: false,
  },
  reducers: {
    chancheCounterValue(state, action) {
      const { id, counter, auth } = action.payload;
      // Знайдемо індекс об'єкта з потрібним ідентифікатором
      if (auth) {
        const index = state.product.findIndex(product => product._id === id);
        if (index !== -1) {
          state.product[index].count = Number(counter);
        }
      } else {
        const index = state.userPr.product.findIndex(
          product => product._id === id
        );
        if (index !== -1) {
          state.userPr.product[index].count = Number(counter);
        }
      }
    },
    addProductOrder(state, action) {
      state.userPr.product.push(action.payload);
    },
    addMyFavoritNotAuth(state, action) {
      Notiflix.Notify.warning(
        'Зареєструйтеся щоб бачити ваші обрані на інших пристроях!'
      );
      state.userPr.myFavorite.push(action.payload);
    },
    delMyFavoritNotAuth(state, action) {
      const deletedProductId = action.payload.idProduct;
      const updatedState = state.userPr.myFavorite.filter(
        pr => pr.idProduct !== deletedProductId
      );
      state.userPr.myFavorite.splice(
        0,
        state.userPr.myFavorite.length,
        ...updatedState
      );
    },
    dellProductOrder(state, action) {
      const deletedProductId = action.payload;
      const updatedState = state.userPr.product.filter(
        pr => pr.id !== deletedProductId
      );
      state.userPr.product.splice(
        0,
        state.userPr.product.length,
        ...updatedState
      );
    },
    dellAllProductOrder(state) {
      state.userPr.history = state.userPr.product;
      state.userPr.product = [];
      state.product = [];
    },
    addHistory(state, action) {
      const dubl = state.userPr.myStore.findIndex(
        pr => pr._id === action.payload._id
      );
      if (dubl === -1) {
        state.userPr.myStore.push(action.payload);
      }
    },
  },
  extraReducers: {
    [addProductBusketAuth.fulfilled](state, action) {
      state.isFetching = false;
      state.product.push(action.payload);
    },
    [addProductBusketAuth.rejected](state, action) {
      state.isFetching = false;
    },
    [fetchProductUser.fulfilled](state, action) {
      state.isFetching = false;
      state.product = action.payload.productBusket;
      state.myFavorite = action.payload.idProductsFetch;
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetching = false;
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
    [logOut.fulfilled](state) {
      state.product = [];
      state.myFavorite = [];
    },
    [getHistoryProduct.fulfilled](state, action) {
      state.isFetching = false;
      state.history = action.payload;
    },
  },
});
export const {
  chancheCounterValue,
  addProductOrder,
  dellProductOrder,
  dellAllProductOrder,
  delMyFavoritNotAuth,
  addMyFavoritNotAuth,
  refreshAuth,
  addHistory,
} = buyProducSlice.actions;
