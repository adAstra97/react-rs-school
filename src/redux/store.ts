import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countries-slice';

export const store = configureStore({
  reducer: {
    selectedCharacters: countriesReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
