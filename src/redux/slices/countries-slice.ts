import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES, Country } from '../../shared/data';

const initialState: Country[] = COUNTRIES;

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
