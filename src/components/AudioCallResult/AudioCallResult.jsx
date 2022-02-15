/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import './AudioCallResult.scss';
import propTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function AudioCallResult(props) {
  const { isGameFinished, rightChoice, wrongChoice } = props;

  function playAudio(path) {
    const audio = new Audio();
    const srcAudio = `https://rslang-react-app.herokuapp.com/${path}`;
    audio.src = srcAudio;
    audio.play();
  }

  const rightChoiceElement = rightChoice.map((answer) => (
    <div key={answer.word}>
      <button onClick={() => playAudio(answer.audio)} type="button">
        play
      </button>
      <span> {answer.word}</span>
      <span> — {answer.wordTranslate}</span>
    </div>
  ));

  const wrongChoiceElement = wrongChoice.map((answer) => (
    <div key={answer.word}>
      <button onClick={() => playAudio(answer.audio)} type="button">
        play
      </button>
      <span> {answer.word}</span>
      <span> — {answer.wordTranslate}</span>
    </div>
  ));

  function handlerCloseButton() {
    window.location.hash = '/';
  }

  return (
    <Modal
      className="AudioCallResult"
      show={isGameFinished}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Результат</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="subtitle">Ошибок</h5>
        <span> {wrongChoice.length}</span>
        {wrongChoiceElement}

        <h5 className="subtitle">Знаю</h5>
        <span> {rightChoice.length}</span>
        {rightChoiceElement}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handlerCloseButton()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

AudioCallResult.propTypes = {
  isGameFinished: propTypes.bool.isRequired,
  rightChoice: propTypes.array,
  wrongChoice: propTypes.array
};

export default AudioCallResult;
