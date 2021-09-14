import React, { Component } from 'react';
import './App.css';
import CardComponent from './components/card-component/card-component';


class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = { deck: null };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Card Application
        </header>
        <div>
          <input type='number' placeholder='deck id'></input>
        </div>
        <div>
          <CardComponent id='13'></CardComponent>
        </div>
      </div>
    );
  }
}

export default App;
