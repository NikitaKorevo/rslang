import React from 'react';
import propTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import './AudioCallHeadband.scss';

function AudioCallHeadband(props) {
  const { gameLevel, setGameLevel, setIsGameInProgress } = props;

  function changeGameLevel(e) {
    setGameLevel(e.target.value);
  }
  function startGame() {
    setIsGameInProgress(true);
  }

  return (
    <main className="AudioCallHeadband">
      <h2>Аудиовызов</h2>
      <p>Выберите правильный перевод услышанного слова.</p>
      <Form.Select className="select" value={gameLevel} onChange={(e) => changeGameLevel(e)}>
        <option value="0">1 уровень</option>
        <option value="1">2 уровень</option>
        <option value="2">3 уровень</option>
        <option value="3">4 уровень</option>
        <option value="4">5 уровень</option>
        <option value="5">6 уровень</option>
      </Form.Select>
      <Button onClick={() => startGame()}>начать</Button>
    </main>
  );
}

AudioCallHeadband.propTypes = {
  gameLevel: propTypes.string.isRequired,
  setGameLevel: propTypes.func.isRequired,
  setIsGameInProgress: propTypes.func.isRequired
};

export default AudioCallHeadband;
