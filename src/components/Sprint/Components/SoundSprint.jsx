import React from 'react';
import './styles/field-statistic-sprint.css';

function SoundSprint (props) {
    const {soundSprintPath} = props;
    
    return  (<button onClick={() => {
        const audio = new Audio();
        audio.src = `https://rslang-react-app.herokuapp.com/${soundSprintPath}`;
        audio.play();

    }} className="sound-statistic-sprint"><img src ='sprint/sound-sprint.svg'/></button>)
}

export {SoundSprint}