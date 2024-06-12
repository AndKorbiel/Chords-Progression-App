import React, { useState } from 'react';
import '../App.css';
import {
  AppControlOptions,
  BpmOptions,
  ChordsOptions,
  RandomChordsGenerator,
  StrummingPatternOptions,
} from './Menu/';

export const Menu = ({ child, state, setState }) => {
  const [menuIsVisible, toggleMenuVisible] = useState(true);

  return (
    <div
      className={
        (menuIsVisible ? 'isVisible' : 'isNotVisible') +
        ' col-sm-12 app-options'
      }
    >
      <ChordsOptions setState={setState} />
      <RandomChordsGenerator setState={setState} />
      <BpmOptions bpm={state.bpm} setState={setState} />

      <StrummingPatternOptions
        setState={setState}
        strummingPattern={state.strummingPattern}
      />

      <AppControlOptions child={child} state={state} setState={setState} />

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
