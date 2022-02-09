import React, { useEffect, useState } from 'react';
import './AudioCall.scss';
import { Button, ButtonGroup, Col, Container } from 'react-bootstrap';
import AudioCallHeadband from '../../components/AudioCallHeadband/AudioCallHeadband';
import AudioCallProgress from '../../components/AudioCallProgress/AudioCallProgress';

function AudioCall() {
  const [data] = useState(0);
  const [amountQuestions, setAmountQuestions] = useState(20);
  const [gameLevel, setGameLevel] = useState('0');
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  useEffect(() => {
    console.log(gameLevel);
  }, [gameLevel]);

  return (
    <div className="AudioCall">
      {isGameInProgress ? (
        <AudioCallProgress />
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
