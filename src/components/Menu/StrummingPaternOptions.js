import React from 'react';
import { RadioButton } from '../';

export const StrummingPatternOptions = ({
  getStrummingPattern,
  strummingPattern,
}) => {
  return (
    <div className="option-row row">
      <div className="col-sm-12 col-md-3">
        <label>Set strumming pattern</label>
      </div>

      <div className="col-sm-12 col-md-9 set-pattern">
        {strummingPattern.map((button) => {
          return (
            <RadioButton
              onChange={(e) => getStrummingPattern(e, button.id)}
              key={button.id}
              buttonName={button.id}
              currentValue={button.value}
            />
          );
        })}
      </div>
    </div>
  );
};
