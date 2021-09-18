import React, { Component } from "react";
import "./card-component.css";
import { getCard } from "../../services/card-service";
import { IonCard, IonCardContent, IonCol, IonModal } from "@ionic/react";
import { Card } from "../../types/card";
import CardDetailModal from "../card-detail-modal/card-detail-modal";

interface CardProps {
  id: string;
}

interface CardState {
  card: Card | undefined;
  modalOpen: boolean;
}

class CardComponent extends Component<CardProps, CardState> {
  state: CardState = {
    card: undefined,
    modalOpen: false,
  };

  componentDidMount() {
    const { id } = this.props;
    if (!id) {
      console.warn("Invalid card id", id);
      return;
    }
    getCard(id).then((res) => {
      this.setState({
        card: res,
      });
    });
  }

  openModal(card: Card) {
    this.setState({
      modalOpen: true,
    });
  }

  render() {
    const { card, modalOpen } = this.state;
    if (!card) {
      return null;
    }
    const imageSource = `https://ringsdb.com${card.imagesrc}`;
    return [
      <IonCol key={card.code} sizeXs="12" sizeSm="6" sizeLg="4" sizeXl="3">
        <IonCard onClick={() => this.openModal(card)}>
          <IonCardContent className="card-content">
            <img className="card-image" src={imageSource} />
          </IonCardContent>
        </IonCard>
      </IonCol>,
      <IonModal
        key={card.code + "-modal"}
        cssClass="card-modal"
        isOpen={modalOpen}
        onDidDismiss={() => this.setState({ modalOpen: false })}
      >
        <CardDetailModal card={card}></CardDetailModal>
      </IonModal>,
    ];
  }
}

export default CardComponent;
