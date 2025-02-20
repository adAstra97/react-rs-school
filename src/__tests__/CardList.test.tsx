import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { CardList } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { Provider } from 'react-redux';
import { store } from '../redux';

describe('CardList', () => {
  it('should render correct number of cards', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList items={mockCharacters} />
        </BrowserRouter>
      </Provider>
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockCharacters.length);
  });
});
