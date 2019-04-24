import React, { Component } from "react";
import "./App.css";
import RadioButton from "./radio-button.js";
import Display from "./display";
import arrayMove from "array-move";

const SPACE_CHORD = "Line Break";
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
  "Bm",
  SPACE_CHORD
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

const kick = new Audio('https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/15[kb]808bd2.aif.mp3');
const hat = new Audio('https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/39[kb]707-ohh.aif.mp3');

class App extends Component {
  state = {
    pickedChords: [],
    currentChord: "",
    nextChord: "",
    chordsQuantity: 0,
    bpm: "80",
    strummingPattern: DEFAULT_STRUMMING_PATTERN,
    errorMessage: "",
    started: "Start",
    menuIsVisible: true,
    isLoading: true
  };

  child = React.createRef();
  currentBPM = 3000;
  interval = null;

  componentDidMount() {
    setTimeout(()=> {
        this.setState({isLoading: false})
    }, 1000)
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ pickedChords }) => ({
      pickedChords: arrayMove(pickedChords, oldIndex, newIndex)

    },
            () => { this.setTheDisplay() }
    ))
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
          this.setTheDisplay();
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

  getNumberOfRandomChords = e => {
    let number = Number(e.target.value);
    if (number <= 36 && number > 0) {
      this.setState({
        chordsQuantity: number,
        errorMessage: ""
      });
    } else {
      this.setState({
        chordsQuantity: null,
        errorMessage: "Incorrect value"
      });
    }
  };

  generateRandomChords = () => {
    if (this.state.chordsQuantity === 0) {
      this.setState({
        chordsQuantity: null,
        errorMessage: "Incorrect value"
      });
    } else {
      let pickedRandomChords = [];

      for (let i = 0; i < this.state.chordsQuantity; i++) {
        pickedRandomChords.push(
          CHORDS[Math.floor(Math.random() * CHORDS.length)]
        );
      }

      this.setState({
        pickedChords: pickedRandomChords
      },
          () => { this.setTheDisplay() }
      );
      }
  };

  selectChord = chord => {
    let updatedChords = [...this.state.pickedChords];
    updatedChords.push(chord);
      console.log(updatedChords)

    this.setState({
      pickedChords: updatedChords
    },
        () => { this.setTheDisplay() }
    );
  };

  removeChord = index => {
    let updatedChords = [...this.state.pickedChords];
    const usunietyElement = updatedChords.splice(index, 1);

    this.setState({
      pickedChords: updatedChords
    },
        () => { this.setTheDisplay() }
    );
  };

  setTheDisplay = () => {
    let i = 0;
    let j = 1;
    if (this.interval != null) {
      clearInterval(this.interval);
    };

    let pickedChordsWithoutSpace = this.state.pickedChords.filter(
      chord => chord != SPACE_CHORD
    );

    this.interval = setInterval(() => {
      this.setState({
        currentChord: pickedChordsWithoutSpace[i++],
        nextChord: pickedChordsWithoutSpace[j++]
      });
      this.audioPlay();

      if (i == pickedChordsWithoutSpace.length) {
        i = 0;
      } else if (j == pickedChordsWithoutSpace.length) {
        j = 0;
      }
      this.child.current.arrowHighlight();

    }, this.currentBPM);

    // maybe this could be removed later
    this.setState({
      started: "Restart"
    });
  };

  audioPlay = () => {
        if (this.interval != null) {
            clearInterval(this.interval)
        }

        this.interval = setInterval( () => {
                kick.play();
                setTimeout(() => {
                        hat.play()
                    }, this.currentBPM / 8
                );
            }, this.currentBPM / 4
        );
  };

  hideMenu = () => {

    let menuState = this.state.menuIsVisible === true ? false : true;
    console.log(menuState)

    this.setState({
        menuIsVisible: menuState
    })
  };

  render() {
    const {
      pickedChords,
      strummingPattern,
      currentChord,
      nextChord
    } = this.state;

    return (

      <div className={ this.state.isLoading ? "hidden" : "visible" + " App container"}>
        <div className="row">
          <div className={(this.state.menuIsVisible === true ? "isVisible" : "isNotVisible")  + " col-sm-12 app-options"}>
            <div className="option-row row">
              <div className="col-sm-12">
                  <h2 className="section-title">Options</h2>
              </div>
              <div className="col-sm-12 col-md-3">
                <label>Pick Your own chords</label>
              </div>
              <div className="col-sm-12 col-md-9">
                <ul className="chords-table">
                  {CHORDS.map(chord => {
                    return (
                      <li
                        key={chord}
                        className={chord === 'Line Break' ? "lineBreakList" : null}
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
                  onChange={this.getNumberOfRandomChords}
                  value={this.state.chordsQuantity}
                />
                <button
                  className="app-button random"
                  onClick={this.generateRandomChords}
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
                      <div className="radioSpan">
                      <input
                        type="radio"
                        name="bpm"
                        value={option}
                        checked={option == this.state.bpm}
                      />
                      <span className="radio-val"> {option}</span>
                      </div>
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
              <div className="col-sm-12 col-md-3" />
              <div className="col-sm-12 col-md-9">
                <button className="app-button" onClick={this.setTheDisplay}>
                  {this.state.started}
                </button>
              </div>
            </div>
              <i className={(this.state.menuIsVisible === true ? "fas fa-chevron-up slideUpButton" : "fas fa-chevron-down slideUpButton")} onClick={this.hideMenu}></i>
          </div>
          <Display
            strummingPattern={strummingPattern}
            pickedChords={pickedChords}
            currentChord={currentChord}
            nextChord={nextChord}
            currentBPM={this.currentBPM}
            onClick={this.removeChord}
            child={this.child}
            items={this.state.pickedChords}
            onSortEnd={this.onSortEnd}
            axis={"x"}
          />
        </div>
      </div>
    );
  }
}

export default App;
