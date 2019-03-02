import React, { Component } from 'react';
import './App.css';

const CHORDS = ['C', 'D', 'Dm', 'E', 'Em', 'E7', 'F', 'Fm', 'G', 'G7', 'A', 'Am', 'A7', 'B', 'Bm']

class App extends Component {

  state = {
    pickedRandomChords: [],
    randomChord: '',
    nextRandomChord: ''
  }
  interval = null

  pickChords = () => {
    let pickedRandomChords = []

    for (let i = 0; i < 4; i++) {
      pickedRandomChords.push(CHORDS[Math.floor(Math.random()*CHORDS.length)]) 
    }

    this.setState({
      pickedRandomChords: pickedRandomChords
    })

    let i = 0;
    let j = 1;  
    if (this.interval != null) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {            
        this.setState({ 
          randomChord: pickedRandomChords[i++], 
          nextRandomChord: pickedRandomChords[j++] 
        })   

        if (i == pickedRandomChords.length) {
          i = 0;          
        }
        else if (j == pickedRandomChords.length) {
          j = 0 
        }
        
    }, 2000);  

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
          </div>
          <div id="player" className="col-sm-12">
            <p className="displayed-chord">{this.state.randomChord} 
              <span className="next-displayed-chord">{this.state.nextRandomChord}</span>
            </p>
            
            <p>{this.state.pickedRandomChords}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
