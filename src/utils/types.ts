export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
  };
  cca3: string;
}

export type SortType = 'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc';
