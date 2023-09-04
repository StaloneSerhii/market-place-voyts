import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productReducer } from './slice';
// import { authSlice } from './authPer/auth-slice';
import { orderReducer } from './orderSlice';
import { authSlice } from './authPer/auth-slice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE],
    },
  }),
];

const rootReducer = combineReducers({
  product: productReducer.reducer,
  myOrder: orderReducer.reducer,
  auth: authSlice.reducer,
});

const persistConfig = {
  key: 'product',
  storage,
};

const persistedReducerAdd = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducerAdd,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);