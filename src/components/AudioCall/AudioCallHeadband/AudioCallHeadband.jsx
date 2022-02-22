import React from 'react';
import propTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import './AudioCallHeadband.scss';
import { observer } from 'mobx-react-lite';
import audioCallStore from '../../../store/audioCallStore';

const AudioCallHeadband = observer((props) => {
  const { setIsGameInProgress } = props;

  function changeGameLevel(e) {
    audioCallStore.setGameLevel(e.target.value);
  }
  function startGame() {
    setIsGameInProgress(true);
  }

  return (
    <main className="AudioCallHeadband">
      <h2>Аудиовызов</h2>
      <p>Выберите правильный перевод услышанного слова.</p>
      <Form.Select
        className="select"
        value={audioCallStore.gameLevel}
        hidden={!(audioCallStore.gamePage === null)}
        onChange={(e) => changeGameLevel(e)}
      >
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
});

AudioCallHeadband.propTypes = {
  setIsGameInProgress: propTypes.func.isRequired
};

export default AudioCallHeadband;
