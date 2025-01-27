import { Component } from 'react';
import Card from '../card/card';

interface CardListProps {
  items: { id: number; name: string; description: string }[];
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div>
        {this.props.items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

export default CardList;
