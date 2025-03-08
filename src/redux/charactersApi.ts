import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UrlConfig } from '../services/url.config';
import {
  Character,
  CharacterResponse,
} from '../shared/types/character.interface';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      CharacterResponse,
      { name: string; page: number }
    >({
      query: ({ name, page }) => ({
        url: UrlConfig.CHARACTER,
        params: { name, page },
      }),
    }),
    getCharacter: builder.query<Character, string>({
      query: (id: string) => `${UrlConfig.CHARACTER}/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
export const { getCharacters, getCharacter } = charactersApi.endpoints;
