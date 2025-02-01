import { CharacterResponse } from '../shared/types/character.interface';
import { instance } from './api';
import { HttpMethod } from './methods';
import { UrlConfig } from './url.config';

export const CharacterService = {
  async getAllCharacters(name: string, page = 1) {
    return instance<CharacterResponse>({
      url: `${UrlConfig.CHARACTER}?name=${name}&page=${page}`,
      method: HttpMethod.GET,
    });
  },
};
