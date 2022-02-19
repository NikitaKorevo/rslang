import React from 'react';
import {SoundSprint} from './SoundSprint';
import './styles/field-statistic-sprint.css';

function AnswerSprint (props) {
    const {answer, correct} = props;
    
    return   <div className ='answer-statistic-sprint'>
        {
            correct ? (
                <div className='correct-answer-statistic-sprint'>
                    <SoundSprint soundSprintPath={answer.audio} />
                    <span className="word-statistic-sprint">{answer.word}</span>
                    <span className="translate-statistic-sprint">{answer.wordTranslate}</span>
                </div>
            ) : (
                <div className='incorrect-answer-statistic-sprint'>
                    <SoundSprint soundSprintPath={answer.audio} />
                    <span className="word-instatistic-sprint">{answer.word}</span>
                    <span className="translate-instatistic-sprint">{answer.wordTranslate}</span>
                </div>
            )
        }       
    </div>
}

export {AnswerSprint}