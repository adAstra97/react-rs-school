import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { UrlConfig } from '../services/url.config';
import {
  Character,
  CharacterResponse,
} from '../shared/types/character.interface';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { RootState } from './store';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, string, 'charactersApi'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
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

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  util: { getRunningQueriesThunk },
} = charactersApi;

export const { getCharacters, getCharacter } = charactersApi.endpoints;
