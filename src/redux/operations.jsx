import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
});

const setAuthHeader = token => {
  return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
};

// const clearAuthHeader = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

export const addProductBusketAuth = createAsyncThunk(
  'buy/addbusket',
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.put('/buy/addbusket', credentials);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'register/login',
  async (user, thunkAPI) => {
    try {
      const response = await instance.post('/register/login', user);
      setAuthHeader(response.data.token);
      if (response) {
        console.log('LogIn success');
      }
      return response.data;
    } catch (error) {
      if (error) {
        console.log('Invalid email or password');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  '/register',
  async (user, thunkAPI) => {
    try {
      const response = await instance.post('/register', user);
      setAuthHeader(response.data.token);
      if (response) {
        console.log('Register success');
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        console.log('This mail is already in use');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'register/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    } else {
      try {
        setAuthHeader(persistedToken);
        const { data } = await instance.get(`/register/current`);
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const fetchProductUser = createAsyncThunk(
  'buy/product',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    } else {
      try {
        setAuthHeader(persistedToken);
        const { data } = await instance.get(`/buy/product`);
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);
// export const logIn = createAsyncThunk('register/login', async credentials => {
//   try {
//     const { data } = await axios.post(`/register/login`, credentials);
//     token.set(data.token);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// });

// export const logOut = createAsyncThunk('auth/logout', async () => {
//   try {
//     await axios.post(`/users/logout`);
//     token.unset();
//   } catch (e) {
//     console.log(e);
//   }
// });
