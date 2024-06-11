import React from 'react';

export const RandomChordsGenerator = ({
  chordsQuantity,
  errorMessage,
  generateRandomChords,
  getNumberOfRandomChords,
}) => {
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
          value={chordsQuantity}
        />
        <button className="app-button random" onClick={generateRandomChords}>
          Get random chords
        </button>
      </div>
    </div>
  );
};
