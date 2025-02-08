import { Character } from './character.interface';

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type CharacterCard = Pick<
  Character,
  'id' | 'name' | 'image' | 'species'
>;

export type DetailedCharacterCard = Pick<
  Character,
  'id' | 'name' | 'image' | 'species' | 'location' | 'origin'
>;
