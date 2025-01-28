import { Component } from 'react';
import Card from '../card/card';
import { Character } from '../../shared/types/character.interface';

interface CardListProps {
  items: Character[];
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div>
        {this.props.items.map((item) => (
          <Card key={item.id} card={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
