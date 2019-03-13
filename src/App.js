import React, { Component } from 'react';
import './App.css';
import Arrows from './arrow.js';
import RadioButton from './radio-button.js';

const CHORDS = ['C', 'D', 'Dm', 'E', 'Em', 'E7', 'F', 'Fm', 'G', 'G7', 'A', 'Am', 'A7', 'B', 'Bm']

class App extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    pickedRandomChords: [],
    randomChord: '',
    nextRandomChord: '',
    chordsQuantity: 0,
    BPM: 3000,
    strummingPattern: [{id: '1', value: 'down'}, {id: '1and', value: 'down'}, {id: '2', value: 'down'}, {id: '2and', value: 'down'}, {id: '3', value: 'down'}, {id: '3and', value: 'down'}, {id: '4', value: 'down'}, {id: '4and', value: 'down'},],
    errorMessage: '',
    started: 'Start',
  }

  interval = null

  getNumberOfChords = (e) => {
    let number = e.target.value;
    if (number <= 12) {
      this.setState({
          chordsQuantity: number,
          errorMessage: ''
      })
    }
    else {
        this.setState({
            chordsQuantity: 12,
            errorMessage: 'Max value is 12'
        })
    }
  }

  getBPM = (e) => {
    let value = e.target.value;
    let currentBPM = 3000

    switch(value) {
      case '80' :
        currentBPM = 3000
        break;
      case '90' :
        currentBPM = 2668
        break
      case '110' :
        currentBPM = 2180
        break
      case '120' :
        currentBPM = 2000
        break
      case '140' :
        currentBPM = 1716
        break
      case '160' :
        currentBPM = 1500
    }

    this.setState({
      BPM: currentBPM
    })

  }

  getStrummingPattern = (e, id) => {
    
    console.log(e.target.value, id)
    const currentPattern = [...this.state.strummingPattern]
    console.log(currentPattern)
    const updated = currentPattern.find((el) => el.id === id)
    updated.value = e.target.value
    this.setState({
          strummingPattern: currentPattern
        })
  }

  pickChords = () => {
    let pickedRandomChords = []

    for (let i = 0; i < this.state.chordsQuantity; i++) {
      pickedRandomChords.push(CHORDS[Math.floor(Math.random()*CHORDS.length)]) 
    }

    this.setState({
      pickedRandomChords: pickedRandomChords,
      started: 'Update'
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

        this.child.current.arrowHighlight()
        
    }, this.state.BPM);  

  }

  render() {
    const { pickedChords, BPM, strummingPattern } = this.state;

    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12">
              <ul className="chords-table">
                {CHORDS.map((chord) => {
                  return (
                    <li key={chord}>{chord}</li>
                  )
                })}
              </ul>
          </div>
          <div className="col-sm-12 app-options">
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>How many chords do You want to practise?</label>
                <span className="error">{this.state.errorMessage}</span>
              </div>
              <div className="col-sm-12 col-md-9">
                <input type="number" onChange={e => this.getNumberOfChords(e)} />
              </div>    
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
              <label>Choose BPM</label>
              </div>
              <div className="col-sm-12 col-md-9" onChange={e => this.getBPM(e)}>
                <input type="radio" name="bpm" value="80" /> <span className="radio-val">80</span>
                <input type="radio" name="bpm" value="90" /> <span className="radio-val">90</span>
                <input type="radio" name="bpm" value="110" /> <span className="radio-val">110</span>
                <input type="radio" name="bpm" value="120" /> <span className="radio-val">120</span> 
                <input type="radio" name="bpm" value="140" /> <span className="radio-val">140</span> 
                <input type="radio" name="bpm" value="160" /> <span className="radio-val">160</span> 
              </div>  
            </div> 
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Set strumming pattern</label>
              </div>
              <div className="col-sm-12 col-md-9">
                <RadioButton getStrummingPattern={this.getStrummingPattern} />
              </div>    
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Everything ready?</label>
              </div> 
              <div className="col-sm-12 col-md-9">
                <button className="app-button" onClick={this.pickChords}>{this.state.started}</button>
              </div> 
            </div>                    
          </div>
          <div id="player" className="col-sm-12">
          <Arrows BPM={BPM} strummingPattern={strummingPattern} ref={this.child} />
            <p className="displayed-chord">{this.state.randomChord} 
              <span className="next-displayed-chord">{this.state.nextRandomChord}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
