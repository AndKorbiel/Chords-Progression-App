import React from 'react';
import { Arrows } from './Arrows';
import ReactTooltip from 'react-tooltip';
import { SortableList } from './SortableList';

export const Display = ({
  pickedChords,
  strummingPattern,
  currentChord,
  nextChord,
  currentBPM,
  child,
  onSortEnd,
  onClick,
}) => {
  return (
    <div id="player" className="col-sm-12">
      <button
        className="tooltips"
        data-tip="Click on chord to remove it. Click and hold to drag and drop and change chords order. Then press Restart button."
      >
        <i className="fas fa-question-circle"></i>
      </button>

      <ReactTooltip place="top" type="dark" effect="float" />

      <SortableList
        pickedChords={pickedChords}
        onClick={onClick}
        onSortEnd={onSortEnd}
        disableAutoscroll={true}
      />

      <Arrows
        BPM={currentBPM}
        strummingPattern={strummingPattern}
        refs={child}
      />

      <p className="displayed-chord">
        {currentChord}
        <span className="next-displayed-chord">{nextChord}</span>
      </p>
    </div>
  );
};
