import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice, filterSlice } from './Slice';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    filter: filterSlice.reducer,
  },
});
