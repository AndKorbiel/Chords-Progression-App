import React from 'react';
import { CHORDS } from '../../constants';

export const ChordsOptions = ({ setState }) => {
  const selectChord = (chord) => {
    setState((state) => ({
      ...state,
      pickedChords: [...state.pickedChords, chord],
    }));
  };

  return (
    <div className="option-row row">
      <div className="col-sm-12">
        <h2 className="section-title">Options</h2>
      </div>

      <div className="col-sm-12 col-md-3">
        <label>Pick Your own chords</label>
      </div>

      <div className="col-sm-12 col-md-9">
        <ul className="chords-table">
          {CHORDS.map((chord) => {
            return (
              <li
                key={chord}
                className={chord === 'Line Break' ? 'lineBreakList' : null}
                onClick={() => selectChord(chord)}
              >
                {chord}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
