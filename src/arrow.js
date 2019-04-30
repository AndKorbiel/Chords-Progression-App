import React, { Component } from "react";
import "./arrows.css";

const arrowS = [
  "arrow1",
  "arrow2",
  "arrow3",
  "arrow4",
  "arrow5",
  "arrow6",
  "arrow7",
  "arrow8"
];

const kick = new Audio(
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/14[kb]analogbd.aif.mp3"
);
const hat = new Audio(
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/16[kb]ec-hat081.wav.mp3"
);

class arrows extends Component {
  state = {
    arrowsState: arrowS.map(() => ({ isHighlighted: false, speed: "one" }))
  };
  sounds = [kick, hat];

  getNewArrowsState = (i, speed) => {
    const newArrowsStateCopy = [...this.state.arrowsState];

    if (i === arrowS.length) {
      newArrowsStateCopy[i] = { isHighlighted: false, speed };
      i = 0;
    } else if (i > 0) {
      newArrowsStateCopy[i - 1] = { isHighlighted: false, speed };
      newArrowsStateCopy[i] = { isHighlighted: true, speed };
      i++;
    } else {
      newArrowsStateCopy[i] = { isHighlighted: true, speed };
      i++;
    }
    return [i, newArrowsStateCopy];
  };

  playNextSound = () => {
    this.sounds[0].play();
    this.sounds.reverse();
  };

  highlight = (i, speed, onFinish) => {
    this.playNextSound();
    const [newI, newState] = this.getNewArrowsState(i, speed);

    if (newI === 0) {
      onFinish();
    } else {
      this.setState(
        {
          arrowsState: newState
        },
        () =>
          setTimeout(
            () => this.highlight(newI, speed, onFinish),
            this.props.BPM / 8
          )
      );
    }
  };

  arrowHighlight = onFinish => {
    let speed = this.getSpeed();

    this.highlight(0, speed, onFinish);
  };

  getSpeed = () => {
    let speed = "one";

    if (this.props.BPM == 1500) {
      speed = "one";
    } else if (this.props.BPM == 1716) {
      speed = "two";
    } else if (this.props.BPM == 2000) {
      speed = "three";
    } else if (this.props.BPM == 2180) {
      speed = "four";
    } else if (this.props.BPM == 2668) {
      speed = "five";
    } else if (this.props.BPM == 3000) {
      speed = "six";
    }
    return speed;
  };

  render() {
    const { strummingPattern } = this.props;

    return (
      <div className="arrow-cont">
        {strummingPattern.map((element, index) => {
          const arrowState = this.state.arrowsState[index];
          const highlightedClass = arrowState.isHighlighted
            ? " highlighted "
            : " ";
          const classes = highlightedClass + arrowState.speed;

          return (
            <div
              className={"arrow fas fa-arrow-" + element.value + classes}
              key={element.id}
            >
              {" "}
            </div>
          );
        })}
      </div>
    );
  }
}

export default arrows;
