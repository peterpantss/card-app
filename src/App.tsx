import "./App.css";
import { Component } from "react";
import CardComponent from "./components/card-component/card-component";
import { getDeck } from "./services/card-service";
import { debounce } from "lodash";
import { Deck } from "./types/deck";

interface AppState {
  deckId: string;
  deck: any;
  debouncer: Function;
}

class App extends Component<any, AppState> {
  state: AppState = {
    deckId: "",
    deck: undefined,
    debouncer: debounce((deckId) => {
      this.getDeckData(deckId);
    }, 1000),
  };

  onChangeDeckId = (deckId: string) => {
    console.log(deckId);
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
    getDeck(deckId).then((deck) => {
      this.setState({
        deck,
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
    const { deckId, deck } = this.state;
    const heroes = this.getHeroes(deck);
    return (
      <div className="app-container">
        <header className="header">Card Application</header>
        <div className="deck-input">
          <label>Give deck id</label>
          <input
            type="text"
            name="test"
            placeholder="deck id"
            onChange={(e) => this.onChangeDeckId(e.target.value)}
            value={deckId}
          ></input>
        </div>
        <div>
          {heroes &&
            Object.keys(heroes)?.map((id: string, i: number) => (
              <CardComponent id={id} count={i} key={i}></CardComponent>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
