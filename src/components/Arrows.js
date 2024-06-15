import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './arrows.css';
import { getArrowAnimationSpeed } from '../utils/utils';
import { arrowsList } from '../constants';

export const Arrows = ({ BPM, isWorking, strummingPattern }) => {
  const arrowAnimationSpeed = useMemo(() => getArrowAnimationSpeed(BPM), [BPM]);

  const [currentArrowIndex, setCurrentArrowIndex] = useState(0);
  const [state, setState] = useState({
    arrowsState: arrowsList.map(() => ({
      isHighlighted: false,
      speed: arrowAnimationSpeed,
    })),
  });

  const animationRef = useRef(null);

  const playAnimation = useCallback(() => {
    animationRef.current = setInterval(() => {
      setState({
        arrowsState: arrowsList.map((_, index) => {
          return {
            isHighlighted: index === currentArrowIndex ? true : false,
            speed: arrowAnimationSpeed,
          };
        }),
      });

      setCurrentArrowIndex((currentArrowIndex) => {
        if (currentArrowIndex === 7) return 0;

        return currentArrowIndex + 1;
      });
    }, BPM / 8);
  }, [BPM, arrowAnimationSpeed, currentArrowIndex]);

  useEffect(() => {
    if (isWorking) playAnimation();
    if (!isWorking) {
      clearInterval(animationRef.current);
      setCurrentArrowIndex(0);
    }

    return () => clearInterval(animationRef.current);
  }, [BPM, isWorking, animationRef, playAnimation]);

  return (
    <div className="arrow-cont">
      {strummingPattern.map((element, index) => {
        const arrowsListtate = state.arrowsState[index];
        const highlightedClass = arrowsListtate.isHighlighted
          ? ' highlighted '
          : ' ';
        const classes = highlightedClass + arrowsListtate.speed;

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
