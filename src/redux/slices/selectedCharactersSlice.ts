import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../shared/types/character.interface';

export interface SelectedCharactersState {
  selectedCharacters: Character[];
}

const initialState: Character[] = [];

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addSelectedCharacter: (state, action: PayloadAction<Character>) => {
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
