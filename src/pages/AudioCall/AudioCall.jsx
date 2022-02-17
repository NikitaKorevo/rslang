import React, { useState } from 'react';
import './AudioCall.scss';
import { observer } from 'mobx-react-lite';
import AudioCallHeadband from '../../components/AudioCall/AudioCallHeadband/AudioCallHeadband';
import AudioCallProgress from '../../components/AudioCall/AudioCallProgress/AudioCallProgress';

const AudioCall = observer(() => {
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  return (
    <div className="AudioCall">
      {isGameInProgress ? (
        <AudioCallProgress />
      ) : (
        <AudioCallHeadband setIsGameInProgress={setIsGameInProgress} />
      )}
    </div>
  );
});

export default AudioCall;
