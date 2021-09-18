import { Component } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import { Card } from "../../types/card";
import { closeOutline } from "ionicons/icons";
import { modalController } from "@ionic/core";

interface CardProps {
  card: Card;
}

class CardDetailModal extends Component<CardProps, any> {
  dismissModal() {
    modalController.dismiss();
  }

  getHeroStat = (name: string, value: number | string) => {
    let val = value.toString();
    return (
      <>
        <h4 style={{ margin: 0 }}>{name}</h4>
        <div
          style={{ marginBottom: "1em", whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: val }}
        ></div>
      </>
    );
  };

  getHeroStats(card: Card) {
    return (
      <>
        {this.getHeroStat("Threat", card.threat)}
        {this.getHeroStat("Willpower", card.willpower)}
        {this.getHeroStat("Attack", card.attack)}
        {this.getHeroStat("Defense", card.defense)}
        {this.getHeroStat("Health", card.health)}
      </>
    );
  }

  getHeroDetails(card: Card) {
    return (
      <>
        {this.getHeroStat("Flavor", card.flavor)}
        {this.getHeroStat("Text", card.text)}
        {this.getHeroStat("Pack", card.pack_name)}
        {this.getHeroStat("Traits", card.traits)}
      </>
    );
  }

  render() {
    const { card } = this.props;
    const imageSource = `https://ringsdb.com${card.imagesrc}`;
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{card.name}</IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={() => this.dismissModal()}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol size="4">
              <h3>Hero card</h3>
            </IonCol>
            <IonCol size="8">
              <h3>Hero info</h3>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <img
                style={{ width: "100%", borderRadius: "5%" }}
                src={imageSource}
              ></img>
            </IonCol>
            <IonCol size="2">{this.getHeroStats(card)}</IonCol>
            <IonCol size="6">{this.getHeroDetails(card)}</IonCol>
          </IonRow>
        </IonContent>
      </>
    );
  }
}

export default CardDetailModal;
