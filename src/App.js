import React, { useState } from 'react';
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
    currentBPM: 3000,
  };
  const [state, setState] = useState(initState);

  return (
    <div className={'App container'}>
      <div className="row">
        <Menu setState={setState} state={state} />
        <Display axis={'x'} setState={setState} state={state} />
      </div>
    </div>
  );
};
