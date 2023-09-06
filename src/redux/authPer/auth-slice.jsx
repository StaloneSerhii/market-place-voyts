import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  logIn,
  logOut,
  register,
  addProductBusketAuth,
  onDeleteProductBusketAuth,
  counterSumAuth,
} from 'redux/operations';

const initialState = {
  user: { name: null, email: null, phone: null, city: null, product: [] },
  token: null,
  isLoggedIn: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [counterSumAuth.fulfilled](state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state) {
      state.user = {
        name: null,
        email: null,
        phone: null,
        city: null,
        product: [],
      };
      state.token = null;
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state) {
      state.isFetching = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetching = false;
    },
    [addProductBusketAuth.fulfilled](state, action) {
      state = action.payload.product;
    },
    [onDeleteProductBusketAuth.fulfilled](state, action) {
      state.product = action.payload.product;
    },
  },
});
