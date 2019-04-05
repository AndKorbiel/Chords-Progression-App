import React, { Component } from "react";
import "./App.css";
import Arrows from "./arrow.js";
import RadioButton from "./radio-button.js";

const CHORDS = [
  "C",
  "D",
  "Dm",
  "E",
  "Em",
  "E7",
  "F",
  "Fm",
  "G",
  "G7",
  "A",
  "Am",
  "A7",
  "B",
  "Bm"
];

const DEFAULT_STRUMMING_PATTERN = [
  { id: "1", value: "down" },
  { id: "1and", value: "down" },
  { id: "2", value: "down" },
  { id: "2and", value: "down" },
  { id: "3", value: "down" },
  { id: "3and", value: "down" },
  { id: "4", value: "down" },
  { id: "4and", value: "down" }
];
const BPM_OPTIONS = [80, 90, 110, 120, 140, 160];

class App extends Component {
  state = {
    pickedChords: [],
    randomChord: "",
    nextRandomChord: "",
    chordsQuantity: 0,
    bpm: "80",
    strummingPattern: DEFAULT_STRUMMING_PATTERN,
    errorMessage: "",
    started: "Start"
  };

  child = React.createRef();
  currentBPM = 3000;
  interval = null;

  getNumberOfChords = e => {
    // zmieni nazwę - pobiera tylko wartość z inputa
    let number = Number(e.target.value);
    if (number <= 12 && number > 1) {
      this.setState({
        chordsQuantity: number,
        errorMessage: ""
      });
    } else {
      this.setState({
        chordsQuantity: 0,
        errorMessage: "Value must be in range 2 - 12"
      });
    }
  };

  getBPM = e => {
    let value = e.target.value;

    switch (value) {
      case "80":
        this.currentBPM = 3000;
        break;
      case "90":
        this.currentBPM = 2668;
        break;
      case "110":
        this.currentBPM = 2180;
        break;
      case "120":
        this.currentBPM = 2000;
        break;
      case "140":
        this.currentBPM = 1716;
        break;
      case "160":
        this.currentBPM = 1500;
    }

    this.setState(
      {
        bpm: value
      },
      () => {
        if (this.interval) {
          this.pickChords();
        }
      }
    );
  };

  getStrummingPattern = (e, id) => {
    const newPattern = [...this.state.strummingPattern];
    const updated = newPattern.find(el => el.id === id);
    updated.value = e.target.value;
    this.setState({
      strummingPattern: newPattern
    });
  };

  getRandomChords = () => {
    // zmienić nazwę - losuje akordy na postawie przekazej wartości
    let pickedRandomChords = [];

    for (let i = 0; i < this.state.chordsQuantity; i++) {
      pickedRandomChords.push(
        CHORDS[Math.floor(Math.random() * CHORDS.length)]
      );
    }

    this.setState({
      pickedChords: pickedRandomChords
    });
  };

  selectChord = chord => {
    let updatedChords = [...this.state.pickedChords];
    updatedChords.push(chord);

    this.setState({
      pickedChords: updatedChords
    });
  };

  removeChord = index => {
    let updatedChords = [...this.state.pickedChords];
    const usunietyElement = updatedChords.splice(index, 1);
    // updatedChords jest tutaj bez `usunietyElement`

    this.setState({
      pickedChords: updatedChords
    });
  };

  pickChords = () => {
    let i = 0;
    let j = 1;
    if (this.interval != null) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.setState({
        randomChord: this.state.pickedChords[i++],
        nextRandomChord: this.state.pickedChords[j++]
      });

      if (i == this.state.pickedChords.length) {
        i = 0;
      } else if (j == this.state.pickedChords.length) {
        j = 0;
      }

      this.child.current.arrowHighlight();
    }, this.currentBPM);

    this.setState({
      started: "Update"
    });
  };

  render() {
    const { pickedChords, BPM, strummingPattern } = this.state;

    // input
    // this.props.onChange - istienej taki props w inpucie
    // this.props.onChange(event) - wywola onchange podajac event jaki zaszedl gdy zajdzie

    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12" />
          <div className="col-sm-12 app-options">
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Pick Your own chords</label>
              </div>
              <div className="col-sm-12 col-md-9">
                <ul className="chords-table">
                  {CHORDS.map(chord => {
                    return (
                      <li
                        key={chord}
                        className={this.state.isSelected}
                        onClick={() => this.selectChord(chord)}
                      >
                        {chord}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Or use random set</label>
                <span className="error">{this.state.errorMessage}</span>
              </div>
              <div className="col-sm-12 col-md-9">
                <input
                  type="number"
                  onChange={this.getNumberOfChords}
                  value={this.state.chordsQuantity}
                />
                <button
                  className="app-button random"
                  onClick={this.getRandomChords}
                >
                  Get random chords
                </button>
              </div>
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Choose BPM</label>
              </div>
              <div className="col-sm-12 col-md-9" onChange={this.getBPM}>
                {BPM_OPTIONS.map(option => {
                  return (
                    <React.Fragment key={`bmp_${option}`}>
                      <input
                        type="radio"
                        name="bpm"
                        value={option}
                        checked={option == this.state.bpm}
                      />
                      <span className="radio-val"> {option}</span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Set strumming pattern</label>
              </div>
              <div className="col-sm-12 col-md-9">
                {strummingPattern.map(button => {
                  return (
                    <RadioButton
                      onChange={e => this.getStrummingPattern(e, button.id)}
                      key={button.id}
                      buttonName={button.id}
                      currentValue={button.value}
                    />
                  );
                })}
              </div>
            </div>
            <div className="option-row row">
              <div className="col-sm-12 col-md-3">
                <label>Everything ready?</label>
              </div>
              <div className="col-sm-12 col-md-9">
                <button className="app-button" onClick={this.pickChords}>
                  {this.state.started}
                </button>
              </div>
            </div>
          </div>
          <div id="player" className="col-sm-12">
            <ul className="chords-table centered">
              {pickedChords.map((chord, index) => {
                return (
                  <li
                    key={"chord" + index}
                    onClick={() => this.removeChord(index)}
                  >
                    {chord}
                  </li>
                );
              })}
            </ul>
            <Arrows
              BPM={this.currentBPM}
              strummingPattern={strummingPattern}
              ref={this.child}
            />

            <p className="displayed-chord">
              {this.state.randomChord}
              <span className="next-displayed-chord">
                {this.state.nextRandomChord}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
