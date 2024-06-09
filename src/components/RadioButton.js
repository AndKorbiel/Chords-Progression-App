import React from 'react';
import './RadioButton.css';

export const RadioButton = ({ buttonName, currentValue, onChange }) => {
  const values = ['down', 'up', 'pass'];

  return (
    <form className="radio-option" onChange={onChange}>
      <span className="radio-title">{buttonName}</span>

      {values.map((value) => (
        <div key={value}>
          <input
            type="radio"
            name="Strumming-pattern"
            value={value}
            checked={currentValue === value}
            onChange={() => {}}
          />

          <span className="radio-val">{value}</span>
        </div>
      ))}
    </form>
  );
};
