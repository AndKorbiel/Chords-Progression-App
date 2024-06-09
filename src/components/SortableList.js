import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export const SortableList = ({ onClick, onSortEnd, pickedChords }) => {
  const SortableItem = SortableElement(({ value, index }) => (
    <li
      onClick={() => onClick(index)}
      className={value === 'Line Break' ? 'lineBreak' : null}
    >
      {value}
    </li>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul className="chords-table centered">
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    );
  });

  return (
    <SortableList
      items={pickedChords}
      onSortEnd={onSortEnd}
      pressDelay={200}
      axis={'xy'}
      helperClass="sortableClass"
      disableAutoscroll={true}
    />
  );
};
