import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  // baseURL: 'https://voyts.onrender.com/api',
  baseURL: 'http://localhost:3333/api',
});

const setAuthHeader = token => {
  return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
};

// const clearAuthHeader = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// Додаваня продуктів в коризну лс і бд
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

// Зміна кількості товарів при покупці товару в лс і бд
export const chanchValueProductCounter = createAsyncThunk(
  'buy/chanchValueProduct',
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.put(
        '/buy/chanchValueProduct',
        credentials
      );
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Логінація
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

// Реєстрація
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

// Оновленя даних юзера
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
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// оновленя даних корзини
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
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Видаленя продуктів з корзини лс і бд
export const onDeleteProductBusket = createAsyncThunk(
  'buy/deletebusket',
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    } else {
      try {
        setAuthHeader(persistedToken);
        const { data } = await instance.patch(`/buy/deletebusket`, {
          _id: _id,
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

// Добавленя продуктів в корзниу
export const buyProductBusket = createAsyncThunk(
  'buy/buyProductBusket',
  async (order, thunkAPI) => {
    try {
      const response = await instance.post('/buy/buyProductBusket', order);
      setAuthHeader(response.data.token);
      if (response) {
        console.log('logOut success');
      }
      return response.data;
    } catch (error) {
      if (error) {
        console.log('Error');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// вихід юзера
export const logOut = createAsyncThunk(
  'register/logout',
  async (user, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    } else {
      try {
        setAuthHeader(persistedToken);
        const response = await instance.post('/register/logout', user);
        if (response) {
          console.log('logOut success');
        }
        return response.data;
      } catch (error) {
        if (error) {
          console.log('Error');
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
