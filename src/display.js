import React, { Component } from "react";
import Arrows from "./arrow.js";

class Display extends Component {

    removeHandler = (index) => {
        const x = index
        console.log('z dzieckoa' + x)
        this.props.onClick(x)
    }

    render() {

        const { pickedChords, strummingPattern, randomChord, nextRandomChord, removeChord, currentBPM, child } = this.props;

        return(
            <div id="player" className="col-sm-12">
                <ul className="chords-table centered">
                    {pickedChords.map((chord, index) => {
                        return (
                            <li
                                key={"chord" + index}
                                onClick={() => this.removeHandler(index)}
                            >
                                {chord} + {index}
                            </li>
                        );
                    })}
                </ul>
                <Arrows
                    BPM={currentBPM}
                    strummingPattern={strummingPattern}
                    ref={child}
                />

                <p className="displayed-chord">
                    {randomChord}
                    <span className="next-displayed-chord">
                {nextRandomChord}
              </span>
                </p>
            </div>
        )
    }
}

export default Display;

