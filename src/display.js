import React, { Component } from "react";
import Arrows from "./arrow.js";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

class Display extends Component {
  SortableItem = SortableElement(({ value, index }) => (
    <li onClick={() => this.removeHandler(index)} className={value === 'Line Break' ? "lineBreak" : null}>{value}</li>
  ));
  SortableList = SortableContainer(({ items }) => {
    return (
      <ul className="chords-table centered">
        {items.map((value, index) => (
          <this.SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            axis="x"
            disabled={value === 'Line Break' ? true : false}
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
          pressDelay={200}
          axis="x"
          helperClass="sortableClass"
          disableAutoscroll={true}
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
