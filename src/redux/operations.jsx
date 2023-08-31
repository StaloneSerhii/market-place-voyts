import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3333/api/product';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// export const addContact = createAsyncThunk(
//   'addProduct',
//   async ({ name, number }, thunkAPI) => {
//     try {
//       const { data } = await axios.post('addProduct', { name, number });
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// Поверненя всіх продуктів головної сторінки з пагінацією

export const fetchProduct = createAsyncThunk('/', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/');
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const fetchProductById = createAsyncThunk('/', async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// export const deleteContact = createAsyncThunk(
//   'contacts/deletecontact',
//   async (taskId, thunkAPI) => {
//     try {
//       const { data } = await axios.delete(`/contacts/${taskId}`);
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// Auth Operations

export const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post(`/users/signup`, credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const logIn = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post(`/users/login`, credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post(`/users/logout`);
    token.unset();
  } catch (e) {
    console.log(e);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistToken = state.auth.token;
    if (persistToken === null) {
      return thunkAPI.rejectWithValue();
    } else {
      try {
        token.set(persistToken);
        const { data } = await axios.get(`/users/current`);
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);
