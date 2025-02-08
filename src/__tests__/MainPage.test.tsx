import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import { CharacterService } from '../services/character.service';
import { handleError } from '../utils/handle-error';
import { MainPage } from '../pages';

vi.mock('../services/character.service.ts');
vi.mock('../utils/handle-error.ts');

describe('MainPage', () => {
  beforeEach(() => {
    vi.spyOn(CharacterService, 'getAllCharacters').mockRejectedValue(
      new Error('API Error')
    );
    vi.mocked(handleError).mockReturnValue('There is nothing here');
  });

  it('should display error message from server if no cards are present', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('There is nothing here :(')).toBeInTheDocument();
    });
  });
});
