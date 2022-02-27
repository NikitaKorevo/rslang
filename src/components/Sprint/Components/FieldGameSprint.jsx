import React from 'react';
import { TimerSprint } from './TimerSprint';
import { useCallback, useEffect } from 'react';
import './styles/field-game-sprint.css';


function FieldGameSprint (props) {
    const handleKeyPress = useCallback((e) => {
            if(e.key === 'ArrowLeft') {
                callBackAnswer(true);
            } else if (e.key === 'ArrowRight' ) {
                callBackAnswer(false);
            }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => {
            document.removeEventListener('keydown', handleKeyPress, false);
        };
    }, [handleKeyPress]);
   
    const {current, callBackAnswer, score, multiScore, callBackFinishTimer, overflowLength, answerFrom} = props;
    let numPicter = 1;
    switch(multiScore) {
        case 10:
            numPicter = 1;
            break;
        case 20:
            numPicter = 2;
            break;
        case 30:
            numPicter = 3;
            break;
    }
    let classAnimation = props.answerFrom;
    return   <div className ='field-game-sprint'>
        <TimerSprint callBackFinishTimer={callBackFinishTimer} />
        <div className="score-sprint">Score: {score}</div>
        <div className="balls-sprint"><img src={`/sprint/levelUpSprint-${numPicter}.png`} /></div> 
        <div className={`desk-for-game ${answerFrom}`}>
            <div className="word-translate-sprint">
                <h3>{current.currentWord}</h3>
                <h4>{current.currentTranslate}</h4>
            </div>
            <div className="buttons-answer-sprint">
                <button className="button-right-sprint" onClick={() => {callBackAnswer(true)}}><span>&#10004;</span></button>
                <button className="button-noright-sprint" onClick={() => {callBackAnswer(false)}}><span>&#10008;</span></button>
            </div>       
        </div>
    </div>
}

export {FieldGameSprint}