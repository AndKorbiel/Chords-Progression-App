import React from 'react';
import { SPACE_CHORD, kick, hat } from '../../constants';

export const AppControlOptions = ({ child, state, setState }) => {
  const { currentBPM, isMuted, isWorking, pickedChords, started } = state;
  let interval = null;
  let intervalAnother = null;

  const audioPlay = () => {
    if (intervalAnother != null) {
      clearInterval(intervalAnother);
    }

    intervalAnother = setInterval(() => {
      if (isWorking && !isMuted) {
        kick.play();
        kick.volume = 0.2;
        setTimeout(() => {
          hat.play();
          hat.volume = 0.5;
        }, currentBPM / 8);
      }
    }, currentBPM / 4);
  };

  const muteAudio = () => {
    setState((state) => ({
      ...state,
      isMuted: !isMuted,
    }));
  };

  const setTheDisplay = () => {
    setState((state) => ({
      ...state,
      isWorking: true,
    }));

    let i = 0;
    let j = 1;

    if (interval != null) {
      clearInterval(interval);
    }

    let pickedChordsWithoutSpace = pickedChords.filter(
      (chord) => chord !== SPACE_CHORD,
    );

    interval = setInterval(() => {
      if (isWorking) {
        setState((state) => ({
          ...state,
          currentChord: pickedChordsWithoutSpace[i++],
          nextChord: pickedChordsWithoutSpace[j++],
        }));

        if (i === pickedChordsWithoutSpace.length) {
          i = 0;
        } else if (j === pickedChordsWithoutSpace.length) {
          j = 0;
        }

        child.current.arrowHighlight();
      }
    }, currentBPM);

    setTimeout(audioPlay, currentBPM);

    setState((state) => ({
      ...state,
      started: 'Restart',
    }));
  };

  const stopTheDisplay = () => {
    setState((state) => ({
      ...state,
      isWorking: false,
    }));
  };

  return (
    <div className="option-row row">
      <div className="col-sm-12 col-md-3" />
      <div className="col-sm-12 col-md-9">
        <button
          className={!isWorking ? 'active app-button' : 'app-button'}
          onClick={setTheDisplay}
        >
          {started}
        </button>

        <button
          className={isWorking ? 'active app-button stop' : 'app-button stop'}
          onClick={stopTheDisplay}
        >
          Stop
        </button>

        <button className="app-button mute" onClick={muteAudio}>
          <i
            className={isMuted ? 'fas fa-volume-up' : 'fas fa-volume-mute'}
          ></i>
        </button>
      </div>
    </div>
  );
};
