import React from 'react';
import {AnswerSprint} from './AnswerSprint';
import './styles/field-statistic-sprint.css';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

function StatisticGameSprint (props) {
    const {correctWords, incorrectWords,callBackGameAgain} = props;
    return   <div className ='field-statistic-sprint'>
        <h3>Correct words:</h3>
        {correctWords.map ((item) => {
            return <AnswerSprint answer={item} key={item.id} correct={true}/>
        }) }
        <h3>Incorrect words:</h3> 
        {incorrectWords.map ((item) => {
            return <AnswerSprint answer={item} key={item.id} correct={false}/>
        }) }
        <div className="buttons-statistic-sprint">
            <button className="game-again-sprint" onClick={() => {callBackGameAgain()}}>&#8634;</button>
            {/* <button className="game-exit-sprint">&#10149;</button> */}
            <NavLink className="game-exit-sprint" to={ROUTES.HOME}>&#10149;</NavLink>
        </div>   
    </div>
}

export {StatisticGameSprint}