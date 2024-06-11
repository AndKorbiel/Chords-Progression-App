import React, { useState } from 'react';
import '../App.css';
import {
  AppControlOptions,
  BpmOptions,
  ChordsOptions,
  RandomChordsGenerator,
  StrummingPatternOptions,
} from './Menu/';

export const Menu = ({
  bpm,
  errorMessage,
  strummingPattern,
  selectChord,
  getNumberOfRandomChords,
  getStrummingPattern,
  chordsQuantity,
  generateRandomChords,
  getBPM,
  isWorking,
  setTheDisplay,
  started,
  stopTheDisplay,
  muteAudio,
  isMuted,
}) => {
  const [menuIsVisible, toggleMenuVisible] = useState(true);

  return (
    <div
      className={
        (menuIsVisible ? 'isVisible' : 'isNotVisible') +
        ' col-sm-12 app-options'
      }
    >
      <ChordsOptions selectChord={selectChord} />

      <RandomChordsGenerator
        chordsQuantity={chordsQuantity}
        errorMessage={errorMessage}
        generateRandomChords={generateRandomChords}
        getNumberOfRandomChords={getNumberOfRandomChords}
      />

      <BpmOptions bpm={bpm} getBPM={getBPM} />

      <StrummingPatternOptions
        getStrummingPattern={getStrummingPattern}
        strummingPattern={strummingPattern}
      />

      <AppControlOptions
        isMuted={isMuted}
        isWorking={isWorking}
        muteAudio={muteAudio}
        setTheDisplay={setTheDisplay}
        started={started}
        stopTheDisplay={stopTheDisplay}
      />

      <i
        className={
          menuIsVisible === true
            ? 'fas fa-chevron-up slideUpButton'
            : 'fas fa-chevron-down slideUpButton'
        }
        onClick={() => toggleMenuVisible(!menuIsVisible)}
      />
    </div>
  );
};
