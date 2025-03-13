import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countries-slice';
import formsReducer from './slices/forms-slice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    forms: formsReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
