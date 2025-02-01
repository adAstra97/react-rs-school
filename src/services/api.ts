import axios from 'axios';

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const instance = axios.create({
  baseURL: API_BASE_URL,
});
