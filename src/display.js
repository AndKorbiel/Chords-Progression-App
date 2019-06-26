import React, { Component } from "react";
import Arrows from "./arrow.js";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ReactTooltip from 'react-tooltip';

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
        <a className="tooltips" data-tip="Click on chord to remove it. Click and hold to drag and drop and change chords order. Then press Restart button."> <i className="fas fa-question-circle"></i></a>
        <ReactTooltip place="top" type="dark" effect="float"/>
        <this.SortableList
          items={pickedChords}
          onSortEnd={onSortEnd}
          pressDelay={200}
          axis={'xy'}
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
