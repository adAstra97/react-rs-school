import { SortType } from './types';

export const BASE_URL = 'https://restcountries.com/v3.1/all';

export const REGIONS = [
  'All regions',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic',
];

export const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Population (Low to High)', value: 'pop-asc' },
  { label: 'Population (High to Low)', value: 'pop-desc' },
];
