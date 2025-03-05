import {
  Character,
  CharacterResponse,
} from '../shared/types/character.interface';
import { API_BASE_URL } from './api';
import { UrlConfig } from './url.config';

export const CharacterService = {
  async getAllCharacters(name: string, page = 1): Promise<CharacterResponse> {
    const res = await fetch(
      `${API_BASE_URL}${UrlConfig.CHARACTER}?name=${name}&page=${page}`
    );

    return res.json();
  },

  async getCharacter(id: string): Promise<Character> {
    const res = await fetch(`${API_BASE_URL}${UrlConfig.CHARACTER}/${id}`);

    return res.json();
  },
};
