import React from 'react';
import {SelectLevelSprint} from './Components/SelectLevelSprint';
import {MainGameSprint} from './Components/MainGameSprint';
import './Sprint.css';

function SprintStart(props) {

  return ( <div className="sprint">
    {
      (props.page === undefined || props.group === undefined) ? <SelectLevelSprint /> :
      <MainGameSprint page={props.page} group={props.group} />
    }

    </div>
  );
}

export {SprintStart};