import React, { useState } from 'react';
import { CHORDS } from '../../constants';

export const RandomChordsGenerator = ({ setState }) => {
  const [numberOfChords, setNumberOfChords] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const getNumberOfRandomChords = (e) => {
    const number = Number(e.target.value);

    if (number <= 36 && number > 0) {
      setNumberOfChords(number);
      setErrorMessage('');
    } else {
      setNumberOfChords(0);
      setErrorMessage('Please provide a number between 1 and 36');
    }
  };

  const generateRandomChords = () => {
    if (numberOfChords > 0 && numberOfChords <= 36) {
      let pickedRandomChords = [];

      for (let i = 0; i < numberOfChords; i++) {
        pickedRandomChords.push(
          CHORDS[Math.floor(Math.random() * CHORDS.length)],
        );
      }

      setState((state) => ({
        ...state,
        pickedChords: pickedRandomChords,
      }));
    }
  };

  return (
    <div className="option-row row">
      <div className="col-sm-12 col-md-3">
        <label>Or use random set</label>
        <span className="error">{errorMessage}</span>
      </div>

      <div className="col-sm-12 col-md-9">
        <input
          type="number"
          onChange={getNumberOfRandomChords}
          value={numberOfChords}
        />

        <button
          className="app-button random"
          onClick={generateRandomChords}
          disabled={!!errorMessage && !numberOfChords}
        >
          Get random chords
        </button>
      </div>
    </div>
  );
};
