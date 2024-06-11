import React, { useEffect, useState } from 'react';
import './arrows.css';

const arrowS = [
  'arrow1',
  'arrow2',
  'arrow3',
  'arrow4',
  'arrow5',
  'arrow6',
  'arrow7',
  'arrow8',
];

export const Arrows = ({ BPM, strummingPattern }) => {
  const [state, setState] = useState({
    arrowsState: arrowS.map(() => ({ isHighlighted: false, speed: 'one' })),
  });

  const getSpeed = () => {
    let speed = 'one';

    if (BPM === 1500) {
      speed = 'one';
    } else if (BPM === 1716) {
      speed = 'two';
    } else if (BPM === 2000) {
      speed = 'three';
    } else if (BPM === 2180) {
      speed = 'four';
    } else if (BPM === 2668) {
      speed = 'five';
    } else if (BPM === 3000) {
      speed = 'six';
    }
    return speed;
  };

  const highlight = () => {
    let i = 0;
    const speed = getSpeed();
    const newArrowsStateCopy = { ...state.arrowsState };

    if (i > 0) {
      newArrowsStateCopy[i - 1] = { isHighlighted: false, speed };
      newArrowsStateCopy[i] = { isHighlighted: true, speed };
      i++;
    } else if (i === arrowS.length) {
      newArrowsStateCopy[i] = { isHighlighted: false, speed };
      i = 0;
      highlight();
    } else {
      newArrowsStateCopy[i] = { isHighlighted: true, speed };
      i++;
    }

    setState({
      arrowsState: newArrowsStateCopy,
    });
  };

  useEffect(() => {
    setTimeout(highlight, BPM / 8);
  }, []);

  return (
    <div className="arrow-cont">
      {strummingPattern.map((element, index) => {
        const arrowState = state.arrowsState[index];
        const highlightedClass = arrowState.isHighlighted
          ? ' highlighted '
          : ' ';
        const classes = highlightedClass + arrowState.speed;

        return (
          <div
            className={'arrow fas fa-arrow-' + element.value + classes}
            key={element.id}
          ></div>
        );
      })}
    </div>
  );
};
