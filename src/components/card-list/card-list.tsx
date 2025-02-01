import { Component } from 'react';
import Card from '../card/card';
import { Character } from '../../shared/types/character.interface';

interface CardListProps {
  items: Character[];
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="my-5 h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto gap-2 flex flex-wrap justify-center">
        {this.props.items.map((item) => (
          <Card key={item.id} card={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
