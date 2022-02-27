import React from 'react';
import './styles/field-game-sprint.css';

class TimerSprint extends React.Component {
    interval = null;

    state = {
        countTimer: 60,
    }

    stopTimer() {
        clearInterval(this.interval);
        this.props.callBackFinishTimer();
    }

    componentDidMount() {
        this.interval = setInterval( () => {
            this.setState({
              countTimer: (this.state.countTimer - 1)
            });
            if(this.state.countTimer === 0) {               
                this.stopTimer();            
            }
          }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render () {
        
        return <div className="timer-sprint">
            {this.state.countTimer}
        </div>
    }
}

export {TimerSprint}