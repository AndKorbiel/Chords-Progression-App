import React, { Component } from 'react';
import './App.css';

const CHORDS = ['C', 'D', 'Dm', 'E', 'Em', 'E7', 'F', 'Fm', 'G', 'G7', 'A', 'Am', 'A7', 'B', 'Bm']

class App extends Component {

  state = {
    pickedChords: [],
  }

  pickChords = () => {
    let pickedRandomChords = []

    for (let i = 0; i < 4; i++) {
      pickedRandomChords.push(CHORDS[Math.floor(Math.random()*CHORDS.length)]) 
    }

    console.log(pickedRandomChords)

    this.setState({
      pickedChords: pickedRandomChords
    })

  }

  displayPickedCHord = () => {
    let i = 0;  
    console.log(this.state)
    let pickedChords = this.state.pickedChords;

    setInterval(function() {            
        document.getElementById('player').innerHTML = '<p class="displayed-chord">'+pickedChords[i++] +'</p>';   
        if (i == pickedChords.length) i = 0;   
    }, 1000);    
  }


  render() {
    const { pickedChords } = this.state;

    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12">
              <ul className="chords-table">
                {CHORDS.map((chord) => {
                  return (
                    <li>{chord}</li>
                  )
                })}
              </ul>
          </div>
          <div className="col-sm-12">
                <button className="app-button" onClick={this.pickChords}>Start</button>
                <button className="app-button" onClick={this.displayPickedCHord}>Start</button>
          </div>
          <div id="player" className="col-sm-12">
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
