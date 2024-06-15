import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SPACE_CHORD, kick, hat } from '../../constants';

export const AppControlOptions = ({ state, setState }) => {
  const { currentBPM, pickedChords, started } = state;
  const [isWorking, setIsWorking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const displayRef = useRef(null);

  const audioPlay = useCallback(() => {
    audioRef.current = setInterval(() => {
      if (isWorking) {
        kick.play();
        kick.volume = 0.2;
        setTimeout(() => {
          hat.play();
          hat.volume = 0.5;
        }, currentBPM / 8);
      }
    }, currentBPM / 4);
  }, [currentBPM, isWorking]);

  const muteAudio = () => {
    if (isMuted) {
      setIsMuted(!isMuted);
      audioPlay();
    } else {
      setIsMuted(!isMuted);
      clearInterval(audioRef.current);
      audioRef.current = null;
    }
  };

  const setTheDisplay = () => {
    setState((state) => ({
      ...state,
      started: 'Restart',
      isWorking: true,
    }));

    setIsWorking(true);
  };

  const stopTheDisplay = () => {
    setIsWorking(false);
    clearInterval(displayRef.current);
    clearInterval(audioRef.current);
    displayRef.current = null;
    audioRef.current = null;

    setState((state) => ({
      ...state,
      started: 'Start',
      isWorking: false,
    }));
  };

  useEffect(() => {
    let i = 0;
    let j = 1;

    if (isWorking) {
      let pickedChordsWithoutSpace = pickedChords.filter(
        (chord) => chord !== SPACE_CHORD,
      );

      displayRef.current = setInterval(() => {
        setState((state) => ({
          ...state,
          currentChord: pickedChordsWithoutSpace[i++],
          nextChord: pickedChordsWithoutSpace[j++],
        }));

        if (i === pickedChordsWithoutSpace.length) {
          i = 0;
        }

        if (j === pickedChordsWithoutSpace.length) {
          j = 0;
        }
        // child.current.arrowHighlight();
      }, currentBPM);

      setTimeout(audioPlay, currentBPM);
    }
  }, [audioPlay, currentBPM, isWorking, pickedChords, setState]);

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
