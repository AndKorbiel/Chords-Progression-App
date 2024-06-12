import React, { useState, useRef } from 'react';
import './App.css';
import { Display, Menu } from './components/';

import { DEFAULT_STRUMMING_PATTERN } from './constants';

export const App = () => {
  const initState = {
    pickedChords: [],
    currentChord: '',
    nextChord: '',
    bpm: 80,
    strummingPattern: DEFAULT_STRUMMING_PATTERN,
    started: 'Start',
    isWorking: false,
    isMuted: false,
    currentBPM: 3000,
  };
  const [state, setState] = useState(initState);
  const child = useRef();

  return (
    <div className={'App container'}>
      <div className="row">
        <Menu child={child} setState={setState} state={state} />
        <Display axis={'x'} setState={setState} state={state} />
      </div>
    </div>
  );
};
