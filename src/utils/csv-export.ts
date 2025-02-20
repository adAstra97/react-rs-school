import { Character } from '../shared/types/character.interface';

export const generateCsvContent = (characters: Character[]): string => {
  const headers = [
    'Name',
    'Status',
    'Species',
    'Gender',
    'Origin',
    'Location',
    'Image',
  ];

  const rows = characters.map((character) => [
    character.name,
    character.status,
    character.species,
    character.gender,
    character.origin.name,
    character.location.name,
    character.image,
  ]);

  return [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\n');
};

export const downloadCsvFile = (
  content: string,
  fileName: string,
  linkElement: HTMLAnchorElement | null
): void => {
  if (!linkElement) return;

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  linkElement.href = url;
  linkElement.download = fileName;
  linkElement.click();
  URL.revokeObjectURL(url);
};
