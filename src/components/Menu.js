import React, { useState } from 'react';
import '../App.css';
import {
  AppControlOptions,
  BpmOptions,
  ChordsOptions,
  RandomChordsGenerator,
  StrummingPatternOptions,
} from './Menu/';

export const Menu = ({ state, setState }) => {
  const [menuIsVisible, toggleMenuVisible] = useState(true);
  const { bpm, strummingPattern } = state;

  return (
    <div
      className={
        (menuIsVisible ? 'isVisible' : 'isNotVisible') +
        ' col-sm-12 app-options'
      }
    >
      <ChordsOptions setState={setState} />
      <RandomChordsGenerator setState={setState} />
      <BpmOptions bpm={bpm} setState={setState} />

      <StrummingPatternOptions
        setState={setState}
        strummingPattern={strummingPattern}
      />

      <AppControlOptions state={state} setState={setState} />

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
