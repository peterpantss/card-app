import React, { Component } from 'react';
import './card-component.css';
import { getCard, getDeck } from '../../services/card-service';

interface CardProps {
  id: string;
}

interface CardState {
  card: any;
}

class CardComponent extends Component<CardProps,CardState> {
  state: CardState = {
    card: null
  };

  componentDidMount() {
    const { id } = this.props;
    getDeck(id).then(res => {
      this.setState({
        card: res
      });
    });
  }

  showCard(info: any) {
    if (!info) {
      return;
    }
    console.log(info);
    return(
      <div>{info.pack_code}</div>
    )
  }

  render() {
    const { card } = this.state;
    return (
      <div className="card-component">
        {this.showCard(card)}
      </div>
    );
  }
}

export default CardComponent;
