import { configureStore } from '@reduxjs/toolkit';
import selectedCharactersReducer from './slices/selectedCharactersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      selectedCharacters: selectedCharactersReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
