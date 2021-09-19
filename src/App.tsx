import "./App.css";
import "@ionic/react/css/core.css";
import { Component } from "react";
import CardComponent from "./components/card-component/card-component";
import { getDeck } from "./services/card-service";
import { debounce } from "lodash";
import { Deck, DeckError } from "./types/deck";
import { IonRow } from "@ionic/react";

interface AppState {
  deckId: string;
  deck: any;
  debouncer: Function;
  error: {
    showError: boolean;
    errorMessage: string | undefined;
  };
}

class App extends Component<any, AppState> {
  state: AppState = {
    deckId: "",
    deck: undefined,
    debouncer: debounce((deckId) => {
      this.getDeckData(deckId);
    }, 1000),
    error: {
      showError: false,
      errorMessage: undefined,
    },
  };

  onChangeDeckId = (deckId: string) => {
    this.setState({
      deckId,
    });
    this.state.debouncer(deckId);
  };

  getDeckData = (deckId: string) => {
    if (!deckId) {
      console.warn("Invalid deck id", deckId);
      this.setState({
        deck: undefined,
      });
      return;
    }

    getDeck(deckId).then((res: Deck | DeckError) => {
      res.hasOwnProperty("error") // API doesn't return well enough errors, always 200 OK
        ? this.setState({
            error: {
              errorMessage: (res as DeckError).error,
              showError: true,
            },
          })
        : this.setState({
            deck: res,
            error: { showError: false, errorMessage: undefined },
          });
    });
  };

  getHeroes(deck: Deck): any {
    if (!deck) {
      console.warn("Deck doesn't exist.");
      return;
    }
    return deck.heroes;
  }

  render() {
    const { deckId, deck, error } = this.state;
    const heroes = this.getHeroes(deck);
    return (
      <div className="app-container">
        <header className="header">Card Application</header>
        <div className="deck-input">
          <label>Give deck id</label>
          <input
            type="text"
            placeholder="deck id"
            onChange={(e) => this.onChangeDeckId(e.target.value)}
            value={deckId}
          ></input>
        </div>
        {!error.showError ? (
          <div>
            {heroes && <h4>Here are your heroes</h4>}
            <IonRow>
              {heroes &&
                Object.keys(heroes)?.map((id: string, i: number) => (
                  <CardComponent id={id} key={i}></CardComponent>
                ))}
            </IonRow>
          </div>
        ) : (
          <div className="error-message">
            <p>{error.errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
