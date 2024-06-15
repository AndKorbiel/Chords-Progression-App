import React from 'react';
import { BPM_OPTIONS } from '../../constants';
import { getBPM } from '../../utils/utils';

export const BpmOptions = ({ bpm, setState }) => {
  const handleOnChange = (e) => {
    const value = e.target.value;
    const nextBPM = getBPM(value);

    setState((state) => ({
      ...state,
      bpm: Number(value),
      currentBPM: nextBPM,
    }));
  };

  return (
    <div className="option-row row">
      <div className="col-sm-12 col-md-3">
        <label>Choose BPM</label>
      </div>

      <div className="col-sm-12 col-md-9" onChange={handleOnChange}>
        {BPM_OPTIONS.map((option) => {
          return (
            <React.Fragment key={`bmp_${option}`}>
              <div className="radioSpan">
                <input
                  type="radio"
                  name="bpm"
                  value={option}
                  checked={option === bpm}
                  onChange={() => {}}
                />

                <span className="radio-val"> {option}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
