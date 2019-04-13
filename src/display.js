import React, { Component } from "react";
import Arrows from "./arrow.js";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

class Display extends Component {
  SortableItem = SortableElement(({ value, index }) => (
    <li onClick={() => this.removeHandler(index)}>{value}</li>
  ));
  SortableList = SortableContainer(({ items }) => {
    return (
      <ul className="chords-table centered">
        {items.map((value, index) => (
          <this.SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
          />
        ))}
      </ul>
    );
  });

  removeHandler = index => {
    this.props.onClick(index);
  };

  render() {
    const {
      pickedChords,
      strummingPattern,
      currentChord,
      nextChord,
      currentBPM,
      child,
      onSortEnd
    } = this.props;

    return (
      <div id="player" className="col-sm-12">
        <this.SortableList
          items={pickedChords}
          onSortEnd={onSortEnd}
          axis={"x"}
          pressDelay={200}
          helperClass="sortableClass"
        />

        <Arrows
          BPM={currentBPM}
          strummingPattern={strummingPattern}
          ref={child}
        />

        <p className="displayed-chord">
          {currentChord}
          <span className="next-displayed-chord">{nextChord}</span>
        </p>
      </div>
    );
  }
}

export default Display;
