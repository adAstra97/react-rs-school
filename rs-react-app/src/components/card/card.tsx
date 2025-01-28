import { Component } from 'react';
import { Character } from '../../shared/types/character.interface';

interface CardProps {
  card: Character;
}

class Card extends Component<CardProps> {
  render() {
    const { name, image } = this.props.card;

    return (
      <div>
        <h3>{name}</h3>
        <p>{image}</p>
      </div>
    );
  }
}

export default Card;
