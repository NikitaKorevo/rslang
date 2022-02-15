import React, { useState, useEffect } from 'react';
import './AudioCall.scss';
import { getRandomNumber } from '../../utils/utils';
import AudioCallHeadband from '../../components/AudioCallHeadband/AudioCallHeadband';
import AudioCallProgress from '../../components/AudioCallProgress/AudioCallProgress';

function AudioCall() {
  const amountQuestions = 20;
  const amountPages = 30;

  const [gameLevel, setGameLevel] = useState('0');
  const [gamePage, setGamePage] = useState('');
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  useEffect(() => {
    setGamePage(getRandomNumber(0, amountPages - 1).toString());
  }, [amountQuestions]);

  return (
    <div className="AudioCall">
      {isGameInProgress ? (
        <AudioCallProgress gameLevel={gameLevel} gamePage={gamePage} />
      ) : (
        <AudioCallHeadband
          gameLevel={gameLevel}
          setGameLevel={setGameLevel}
          setIsGameInProgress={setIsGameInProgress}
        />
      )}
    </div>
  );
}

export default AudioCall;
