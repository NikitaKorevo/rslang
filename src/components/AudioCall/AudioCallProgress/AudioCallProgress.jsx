import React, { useEffect, useState } from 'react';
import './AudioCallProgress.scss';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getRandomNumber, shuffleArray } from '../../../utils/utils';
import CONSTANTS from '../../../constants/constants';
import audioCall from '../../../store/audioCall';
import AudioCallResult from '../AudioCallResult/AudioCallResult';
import UsersStatisticAPI from '../../../API/usersStatisticAPI';

const AudioCallProgress = observer(() => {
  const amountPages = 30;

  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [words, setWords] = useState([]);
  const [mixedWords, setMixedWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPressedButton, setCurrentPressedButton] = useState(null);
  const [positionRightAnswer, setPositionRightAnswer] = useState(null);
  const [rightChoice, setRightChoice] = useState([]);
  const [wrongChoice, setWrongChoice] = useState([]);
  const [longestWinningStreak, setLongestWinningStreak] = useState(0);
  const [winningStreak, setWinningStreak] = useState(0);
  const [randomButtonValues, setRandomButtonValues] = useState([]);
  const [buttonStatus, setButtonStatus] = useState([
    'primary',
    'primary',
    'primary',
    'primary',
    'primary'
  ]);

  useEffect(() => {
    async function getWords() {
      const gamePage = audioCall.gamePage
        ? audioCall.gamePage
        : getRandomNumber(0, amountPages - 1).toString();

      // TODO: delete console.log
      console.log('gamePage', gamePage);
      console.log('audioCall.gameLevel', audioCall.gameLevel);

      const response = await fetch(
        `${CONSTANTS.baseUrl}words?page=${gamePage}&group=${audioCall.gameLevel}`
      );
      const data = await response.json();
      setWords(data);

      const shuffleData = shuffleArray(data);
      const firstQuestion = shuffleData.shift();
      setCurrentQuestion(firstQuestion);

      const randomAnswers = [];
      while (randomAnswers.length < 4) {
        const randomWord = data[getRandomNumber(0, data.length - 1)].wordTranslate;
        if (!randomAnswers.includes(randomWord) && randomWord !== firstQuestion.wordTranslate) {
          randomAnswers.push(randomWord);
        }
      }
      const randomPositionRightAnswer = getRandomNumber(0, 4);
      setPositionRightAnswer(randomPositionRightAnswer);

      randomAnswers.splice(randomPositionRightAnswer, 0, firstQuestion.wordTranslate);
      setRandomButtonValues(randomAnswers);

      setMixedWords(shuffleData);
      setIsQuestion(true);
    }
    getWords();
  }, []);

  useEffect(() => {
    function autoPlayAudio() {
      const audio = new Audio();
      const srcAudio = `${CONSTANTS.baseUrl}${currentQuestion.audio}`;
      audio.src = srcAudio;
      audio.play();
    }
    if (isQuestion) autoPlayAudio();
  }, [isQuestion, currentQuestion]);

  function playAudio() {
    const audio = new Audio();
    const srcAudio = `${CONSTANTS.baseUrl}${currentQuestion.audio}`;
    audio.src = srcAudio;
    audio.play();
  }

  function handlerAnswerButton(buttonNumber) {
    if (!isQuestion) return;
    setIsQuestion(false);
    const buttonStatusCopy = [...buttonStatus];

    if (positionRightAnswer === buttonNumber) {
      buttonStatusCopy[buttonNumber] = 'success';
      setRightChoice([...rightChoice, currentQuestion]);

      if (longestWinningStreak < winningStreak) {
        setLongestWinningStreak(winningStreak);
      }
      setWinningStreak(winningStreak + 1);
    } else {
      if (buttonNumber !== null) buttonStatusCopy[buttonNumber] = 'danger';
      setWrongChoice([...wrongChoice, currentQuestion]);
      buttonStatusCopy[positionRightAnswer] = 'success';

      if (longestWinningStreak < winningStreak) {
        setLongestWinningStreak(winningStreak);
      }
      setWinningStreak(0);
    }
    setButtonStatus(buttonStatusCopy);
    setCurrentPressedButton(buttonNumber);
  }

  function showResult() {
    console.log('rightChoice', rightChoice);
    console.log('wrongChoice', wrongChoice);
    console.log('longestWinningStreak', longestWinningStreak);
    console.log('winningStreak', winningStreak);

    const amountRightChoice = rightChoice.length;
    const amountWrongChoice = wrongChoice.length;
    UsersStatisticAPI.pushUserStatistic(
      'audioCall',
      amountRightChoice,
      amountWrongChoice,
      longestWinningStreak
    );
    setIsGameFinished(true);
  }

  function skipExercise() {
    handlerAnswerButton(null);
  }

  function nextExercise() {
    if (mixedWords.length === 0) return showResult();

    const nextQuestion = mixedWords.shift();
    setCurrentQuestion(nextQuestion);

    const randomAnswers = [];
    while (randomAnswers.length < 4) {
      const randomWord = words[getRandomNumber(0, words.length - 1)].wordTranslate;
      if (!randomAnswers.includes(randomWord) && randomWord !== nextQuestion.wordTranslate) {
        randomAnswers.push(randomWord);
      }
    }
    const randomPositionRightAnswer = getRandomNumber(0, 4);
    setPositionRightAnswer(randomPositionRightAnswer);

    randomAnswers.splice(randomPositionRightAnswer, 0, nextQuestion.wordTranslate);
    setRandomButtonValues(randomAnswers);

    setButtonStatus(new Array(buttonStatus.length).fill('primary'));
    return setIsQuestion(true);
  }

  useEffect(() => {
    function handlerHotkeys(e) {
      e.preventDefault();
      const buttonNumber = e.key;
      switch (buttonNumber) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          handlerAnswerButton(buttonNumber - 1);
          break;

        case 'Enter':
          if (isQuestion) skipExercise();
          if (!isQuestion) nextExercise();
          break;

        default:
          break;
      }
    }
    document.addEventListener('keydown', handlerHotkeys);

    return () => document.removeEventListener('keydown', handlerHotkeys);
  });

  return (
    <div className="AudioCallProgress">
      <AudioCallResult
        isGameFinished={isGameFinished}
        rightChoice={rightChoice}
        wrongChoice={wrongChoice}
      />
      {isQuestion ? (
        <div className="scoreboard">
          <Button
            className="button-play-audio"
            type="button"
            variant="info"
            onClick={() => playAudio()}
          >
            послушать
          </Button>
        </div>
      ) : (
        <div className="scoreboard">
          <img
            className="image"
            src={currentQuestion ? `${CONSTANTS.baseUrl}${currentQuestion?.image}` : ''}
            alt=""
          />
          <h3>{currentQuestion?.word}</h3>
          <Button
            className="button-play-audio"
            type="button"
            variant="info"
            onClick={() => playAudio()}
          >
            послушать
          </Button>
        </div>
      )}
      <div className="control">
        <Button
          variant={buttonStatus[0]}
          type="button"
          disabled={!isQuestion}
          onClick={() => handlerAnswerButton(0)}
        >
          1 {randomButtonValues[0]}
        </Button>
        <Button
          variant={buttonStatus[1]}
          type="button"
          disabled={!isQuestion}
          onClick={() => handlerAnswerButton(1)}
        >
          2 {randomButtonValues[1]}
        </Button>
        <Button
          variant={buttonStatus[2]}
          type="button"
          disabled={!isQuestion}
          onClick={() => handlerAnswerButton(2)}
        >
          3 {randomButtonValues[2]}
        </Button>
        <Button
          variant={buttonStatus[3]}
          type="button"
          disabled={!isQuestion}
          onClick={() => handlerAnswerButton(3)}
        >
          4 {randomButtonValues[3]}
        </Button>
        <Button
          variant={buttonStatus[4]}
          type="button"
          disabled={!isQuestion}
          onClick={() => handlerAnswerButton(4)}
        >
          5 {randomButtonValues[4]}
        </Button>
      </div>
      {isQuestion ? (
        <Button type="button" onClick={() => skipExercise()}>
          не знаю
        </Button>
      ) : (
        <Button type="button" onClick={() => nextExercise()}>
          продолжить
        </Button>
      )}
    </div>
  );
});

export default AudioCallProgress;
