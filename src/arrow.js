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

class arrows extends Component {
  state = {
    arrowsState: arrowS.map(() => ({ isHighlighted: false, speed: "one" }))
  };

  arrowHighlight = () => {

    let i = 0;
    let speed = this.getSpeed();

    let highlight = () => {
      const newArrowsStateCopy = [...this.state.arrowsState];
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

      this.setState(
        {
          arrowsState: newArrowsStateCopy
        },
        () => setTimeout(highlight, this.props.BPM / 8)
      );
    };
    highlight();
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
