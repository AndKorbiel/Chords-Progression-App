import React, { Component } from 'react';
import './App.css';

const CHORDS = ['C', 'D', 'Dm', 'E', 'Em', 'E7', 'F', 'Fm', 'G', 'G7', 'A', 'Am', 'A7', 'B', 'Bm']

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div className="App">
              <ul className="chords-table">
                {CHORDS.map((chord) => {
                  return (
                    <li>{chord}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
