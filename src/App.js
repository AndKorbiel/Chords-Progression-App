import React, { Component } from 'react';
import './App.css';
import { Display, Menu, RadioButton } from './components/';
import arrayMove from 'array-move';
import {
  BPM_OPTIONS,
  CHORDS,
  DEFAULT_STRUMMING_PATTERN,
  SPACE_CHORD,
  hat,
  kick,
} from './constants';

class App extends Component {
  state = {
    pickedChords: [],
    currentChord: '',
    nextChord: '',
    chordsQuantity: 0,
    bpm: '80',
    strummingPattern: DEFAULT_STRUMMING_PATTERN,
    errorMessage: '',
    started: 'Start',
    menuIsVisible: true,
    isWorking: false,
    isMuted: false,
  };

  child = React.createRef();
  currentBPM = 3000;
  interval = null;

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ pickedChords }) => ({
      pickedChords: arrayMove(pickedChords, oldIndex, newIndex),
      isWorking: false,
    }));
  };

  getBPM = (e) => {
    let value = e.target.value;

    switch (value) {
      case '80':
        this.currentBPM = 3000;
        break;
      case '90':
        this.currentBPM = 2668;
        break;
      case '110':
        this.currentBPM = 2180;
        break;
      case '120':
        this.currentBPM = 2000;
        break;
      case '140':
        this.currentBPM = 1716;
        break;
      case '160':
        this.currentBPM = 1500;
    }

    this.stopTheDisplay();

    this.setState({
      bpm: value,
    });
  };

  getStrummingPattern = (e, id) => {
    const newPattern = [...this.state.strummingPattern];
    const updated = newPattern.find((el) => el.id === id);
    updated.value = e.target.value;
    this.setState({
      strummingPattern: newPattern,
    });
  };

  getNumberOfRandomChords = (e) => {
    let number = Number(e.target.value);
    if (number <= 36 && number > 0) {
      this.setState({
        chordsQuantity: number,
        errorMessage: '',
      });
    } else {
      this.setState({
        chordsQuantity: null,
        errorMessage: 'Incorrect value',
      });
    }
  };

  generateRandomChords = () => {
    if (this.state.chordsQuantity === 0) {
      this.setState({
        chordsQuantity: null,
        errorMessage: 'Incorrect value',
      });
    } else {
      let pickedRandomChords = [];

      for (let i = 0; i < this.state.chordsQuantity; i++) {
        pickedRandomChords.push(
          CHORDS[Math.floor(Math.random() * CHORDS.length)],
        );
      }

      this.setState({
        pickedChords: pickedRandomChords,
      });
    }
  };

  selectChord = (chord) => {
    let updatedChords = [...this.state.pickedChords];
    updatedChords.push(chord);

    this.setState({
      pickedChords: updatedChords,
    });
  };

  removeChord = (index) => {
    let updatedChords = [...this.state.pickedChords];
    // WTF ???
    const usunietyElement = updatedChords.splice(index, 1);

    this.setState({
      pickedChords: updatedChords,
      isWorking: false,
    });
  };

  setTheDisplay = () => {
    this.setState({
      isWorking: true,
    });

    let i = 0;
    let j = 1;
    if (this.interval != null) {
      clearInterval(this.interval);
    }

    let pickedChordsWithoutSpace = this.state.pickedChords.filter(
      (chord) => chord != SPACE_CHORD,
    );

    this.interval = setInterval(() => {
      if (this.state.isWorking) {
        this.setState({
          currentChord: pickedChordsWithoutSpace[i++],
          nextChord: pickedChordsWithoutSpace[j++],
        });

        if (i == pickedChordsWithoutSpace.length) {
          i = 0;
        } else if (j == pickedChordsWithoutSpace.length) {
          j = 0;
        }
        this.child.current.arrowHighlight();
      }
    }, this.currentBPM);

    setTimeout(this.audioPlay, this.currentBPM);

    this.setState({
      started: 'Restart',
    });
  };

  stopTheDisplay = () => {
    this.setState({
      isWorking: false,
    });
  };

  audioPlay = () => {
    if (this.intervalAnother != null) {
      clearInterval(this.intervalAnother);
    }

    this.intervalAnother = setInterval(() => {
      if (this.state.isWorking && !this.state.isMuted) {
        kick.play();
        kick.volume = 0.2;
        setTimeout(() => {
          hat.play();
          hat.volume = 0.5;
        }, this.currentBPM / 8);
      }
    }, this.currentBPM / 4);
  };

  muteAudio = () => {
    this.setState({
      isMuted: !this.state.isMuted,
    });
  };

  hideMenu = () => {
    let menuState = this.state.menuIsVisible === true ? false : true;
    console.log(menuState);

    this.setState({
      menuIsVisible: menuState,
    });
  };

  render() {
    const { pickedChords, strummingPattern, currentChord, nextChord } =
      this.state;

    return (
      <div className={'App container'}>
        <div className="row">
          <Menu
            bpm={this.state.bpm}
            errorMessage={this.state.errorMessage}
            strummingPattern={this.state.strummingPattern}
            selectChord={this.selectChord}
            getNumberOfRandomChords={this.getNumberOfRandomChords}
            getStrummingPattern={this.getStrummingPattern}
            chordsQuantity={this.state.chordsQuantity}
            generateRandomChords={this.generateRandomChords}
            getBPM={this.getBPM}
            isWorking={this.state.isWorking}
            setTheDisplay={this.setTheDisplay}
            started={this.state.started}
            stopTheDisplay={this.stopTheDisplay}
            muteAudio={this.muteAudio}
            isMuted={this.state.isMuted}
          />

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
            axis={'x'}
          />
        </div>
      </div>
    );
  }
}

export default App;
