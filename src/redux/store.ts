import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './charactersApi';
import selectedCharactersReducer from './slices/selectedCharactersSlice';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
