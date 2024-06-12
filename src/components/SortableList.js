import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

export const SortableList = ({ setState, pickedChords }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState((state) => ({
      ...state,
      pickedChords: arrayMove(state.pickedChords, oldIndex, newIndex),
      isWorking: false,
    }));
  };

  const removeChord = (index) => {
    const updatedChords = [...pickedChords];
    updatedChords.splice(index, 1);

    setState((state) => ({
      ...state,
      pickedChords: updatedChords,
      isWorking: false,
    }));
  };

  const SortableItem = SortableElement(({ value, index }) => (
    <li
      onClick={() => removeChord(index)}
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
