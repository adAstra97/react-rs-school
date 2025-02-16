import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterCard } from '../../shared/types/types';

export interface SelectedCharactersState {
  selectedCharacters: CharacterCard[];
}

const initialState: CharacterCard[] = [];

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addSelectedCharacter: (state, action: PayloadAction<CharacterCard>) => {
      state.push(action.payload);
    },
    removeSelectedCharacter: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(
        (character) => character.id === action.payload
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    clearSelectedCharacters: () => {
      return [];
    },
  },
});

export const {
  addSelectedCharacter,
  removeSelectedCharacter,
  clearSelectedCharacters,
} = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
