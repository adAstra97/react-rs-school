import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { charactersApi } from './charactersApi';
import selectedCharactersReducer from './slices/selectedCharactersSlice';

const combinedReducer = combineReducers({
  selectedCharacters: selectedCharactersReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });

export type RootState = ReturnType<typeof combinedReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
