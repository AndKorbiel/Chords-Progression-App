import React from 'react';

export const AppControlOptions = ({
  isMuted,
  isWorking,
  muteAudio,
  setTheDisplay,
  started,
  stopTheDisplay,
}) => {
  return (
    <div className="option-row row">
      <div className="col-sm-12 col-md-3" />
      <div className="col-sm-12 col-md-9">
        <button
          className={!isWorking ? 'active app-button' : 'app-button'}
          onClick={setTheDisplay}
        >
          {started}
        </button>

        <button
          className={isWorking ? 'active app-button stop' : 'app-button stop'}
          onClick={stopTheDisplay}
        >
          Stop
        </button>

        <button className="app-button mute" onClick={muteAudio}>
          <i
            className={isMuted ? 'fas fa-volume-up' : 'fas fa-volume-mute'}
          ></i>
        </button>
      </div>
    </div>
  );
};
