import React from 'react';
import { MainGameSprint } from './MainGameSprint';
import  './styles/select-level-sprint.css';

class SelectLevelSprint extends React.Component {
    state = {
        levelGameSprint: 0,
    }
    selectLevel = (e) => {
        this.setState({levelGameSprint: e.target.getAttribute('data-id')});
    }
    render () {
        const {levelGameSprint} = this.state;
        const page = 0;
        const group = 0;

        return <div className="select-level-sprint">
          {
             !levelGameSprint ? (<div className='select-level-sprint-container'>
             <h3>Select level</h3>
             <div className='select-level-sprint-buttons'>
                <button className="select-sprint-1" onClick={this.selectLevel} data-id='1'>1</button>
                <button className="select-sprint-2" onClick={this.selectLevel} data-id='2'>2</button>
                <button className="select-sprint-3" onClick={this.selectLevel} data-id='3'>3</button>
                <button className="select-sprint-4" onClick={this.selectLevel} data-id='4'>4</button>
                <button className="select-sprint-5" onClick={this.selectLevel} data-id='5'>5</button>
                <button className="select-sprint-6" onClick={this.selectLevel} data-id='6'>6</button>           
             </div>
         </div>) :
            (<MainGameSprint levelGameSprint={levelGameSprint} />)
          } 
        </div>
    }
}

export {SelectLevelSprint}