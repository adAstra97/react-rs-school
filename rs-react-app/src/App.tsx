import { Component } from 'react';
import { CardList, ErrorBoundary, ErrorButton, Search } from './components';

const mockData = [
  {
    id: 1,
    name: 'Product A',
    description: 'Description of Product A',
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Description of Product B',
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Description of Product C',
  },
  {
    id: 4,
    name: 'Product D',
    description: 'Description of Product D',
  },
  {
    id: 5,
    name: 'Product E',
    description: 'Description of Product E',
  },
  {
    id: 6,
    name: 'Product F',
    description: 'Description of Product F',
  },
  {
    id: 7,
    name: 'Product G',
    description: 'Description of Product G',
  },
  {
    id: 8,
    name: 'Product H',
    description: 'Description of Product H',
  },
  {
    id: 9,
    name: 'Product I',
    description: 'Description of Product I',
  },
  {
    id: 10,
    name: 'Product J',
    description: 'Description of Product J',
  },
];

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <header className="app__header">
            <Search />
          </header>
          <main className="app__content">
            <CardList items={mockData} />
            <ErrorButton />
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
