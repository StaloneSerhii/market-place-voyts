import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { resendEmailVerf } from './service';

const instance = axios.create({
  baseURL: 'https://voyts.onrender.com/api',
  // baseURL: 'http://localhost:3333/api',
});

const setAuthHeader = token => {
  return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
};

// const clearAuthHeader = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// Видалення продуктів в обране
export const delMyFavorite = createAsyncThunk(
  'buy/dellMyFavorite',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.put('/buy/dellMyFavorite', {
        idProduct: id,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Додаваня продуктів в обране
export const addMyFavorite = createAsyncThunk(
  'buy/addMyFavorite',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.persistedReducerAdd.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.put('/buy/addMyFavorite', {
        idProduct: id,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

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
      const response = await instance.put('/buy/addbusket', credentials);
      if (response) {
        Notiflix.Notify.success('Ваш товар успішно доданий в корзину!');
        return response.data;
      }
    } catch (e) {
      console.log(e);
      Notiflix.Notify.failure(
        'Не вдалося добавити товар в корзину обновіть сторінку і спробуйте знову!'
      );
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
        Notiflix.Notify.success('Ви успішно авторизувалися');
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 402) {
        return Notiflix.Confirm.show(
          'Вітаємо',
          'Ви успішно зареєструвалися в нас на сайті, підвердіть свою особу в електроному листі який на пошті яку ви вказали',
          'Відправити лист повторно?',
          'Вийти',
          function okCb() {
            resendEmailVerf({ email: user.email });
          },
          function cancelCb() {},
          {
            width: '320px',
            borderRadius: '8px',
            // etc...
          }
        );
      } else if (error) {
        Notiflix.Notify.warning('Неправильно ведений логін або пароль');
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
        Notiflix.Report.success(
          'Ви успішно зареєструвалися на нашому сайті',
          'Перейдіть на свою електрону адресу яку ви вказали під час реєстрації щоб підтвердити користувача!'
        );
      }
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        Notiflix.Report.failure(
          `Не вдалося зареєструвати нового користувача, обновіть сторінку і спробуйте ще раз!`,
          `${error.response.data.message}`
        );
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
        Notiflix.Notify.failure(
          'Не вдалося видалити товар з корзини, спробуйте обновити сторінку і спробувати знову...'
        );
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
        Notiflix.Notify.success(
          'Ваш товар відправлений на обробку адміністрацією, дякуємо за покупку!'
        );
      }
      return response.data;
    } catch (error) {
      if (error) {
        Notiflix.Notify.failure(
          'Не вдалося добавити товар в корзину обновіть сторінку і спробуйте знову!'
        );
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
          Notiflix.Notify.success('Ви успішно вийшли із свого акаунта!');
        }
        return response.data;
      } catch (error) {
        if (error) {
          Notiflix.Notify.failure(
            'Не вдалося вийти з вашого облікового запису, спробуйте ще раз!'
          );
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
