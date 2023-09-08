import { createSlice } from '@reduxjs/toolkit';
import {
  logIn,
  register,
  fetchCurrentUser,
  chanchValueProductCounter,
  logOut,
} from 'redux/operations';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [chanchValueProductCounter.fulfilled](state) {
      state.isFetching = false;
      // Знайдемо індекс об'єкта з потрібним ідентифікатором
    },
    [logOut.fulfilled](state) {
      state.isLoggedIn = false;
      // Знайдемо індекс об'єкта з потрібним ідентифікатором
    },
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [fetchCurrentUser.rejected](state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});
