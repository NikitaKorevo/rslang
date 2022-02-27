import React from 'react';
import {FieldGameSprint} from './FieldGameSprint';
import {StatisticGameSprint} from './StatisticGameSprint';
import {toCalcProgressWord, isUserWord, getUserWord} from '../../../API/progress';
import './styles/field-game-sprint.css';
import UsersStatisticAPI from '../../../API/usersStatisticAPI';

class MainGameSprint extends React.Component {
    state = {
        loading: true,
        startGame: true,
        score: 0,
        numberCorrect: 0,
        multiScore: 10,
        finishTimer: false,
        words: [],
        shuffleWords: [],
        shuffleTranslates: [],
        correctWords: [],
        incorrectWords: [],
        current: {
            currentWord: '',
            currentTranslate: '',
        },
        currentCount: 0,
        countPages: -1,
        totalPages: -1,
        overflowLength: false,
        answerFrom: '',
        isAuth: false,
        group: 0,
        numberNewWords: 0,
        numberLearnedWords: 0,
        maxNumberCorrect: 0,  
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    callbackSendStatistic = async() => {
        if(this.state.isAuth) {
            if (this.state.maxNumberCorrect >= this.state.numberCorrect) {
                await UsersStatisticAPI.updateUserStatistic('sprint', this.state.correctWords.length, this.state.incorrectWords.length,
                this.state.maxNumberCorrect, this.state.numberNewWords, this.state.numberLearnedWords);
            } else if (this.state.maxNumberCorrect < this.state.numberCorrect) {
                await UsersStatisticAPI.updateUserStatistic('sprint', this.state.correctWords.length, this.state.incorrectWords.length,
                this.state.numberCorrect, this.state.numberNewWords, this.state.numberLearnedWords);
            }
        }
    }

    isCorrectCurrentTranslate = (current) => {
        const indexCurrent = this.state.words.findIndex(word => (word.word === current.currentWord));
        return (this.state.words[indexCurrent].wordTranslate === current.currentTranslate);
    }

    changeCurrentTranslate = () => {
        this.setState({current: {currentWord: this.state.shuffleWords[this.state.currentCount]}}, () => {
            const r = Math.random();
            let translate;
            if(r > 0.5) {   
                const indexCurrent = this.state.words.findIndex(word => (word.word === this.state.current.currentWord));
                translate = this.state.words[indexCurrent].wordTranslate;
            } else {
                translate = this.state.shuffleTranslates[this.state.currentCount];           
            }
            this.setState({current: {currentWord: this.state.shuffleWords[this.state.currentCount], 
            currentTranslate: translate}});   
        });
    } 

    changeCurrent = () => {

        this.setState({currentCount: this.state.currentCount + 1}, () => {
            if(this.state.currentCount >= this.state.words.length) {
                this.setState({countPages: this.state.countPages - 1}, async() => {
                    if(this.state.countPages < 0) {
                        console.log(this.state.countPages);
                        this.setState({overflowLength: true});
                    } else {
                        const response = await fetch(`https://rslang-react-app.herokuapp.com/words?page=${this.state.countPages}&group=${this.props.group}`);
                        const data = await response.json();
                        console.log(data);
                        this.setState({words: this.state.words.concat(data)});
                        this.setState({shuffleWords: [...this.state.shuffleWords,...this.shuffle(data.map((item) => item.word))]});             
                        this.setState({shuffleTranslates: [...this.state.shuffleTranslates,...this.shuffle(this.state.words.map((item) => item.wordTranslate))]});   
                        this.changeCurrentTranslate();
                    }
                })
            } else {
                this.changeCurrentTranslate();
            }
        });
    }

    saveCorrectAnswer = () => {
        const {current} = this.state;
        const indexCurrent = this.state.words.findIndex(word => (word.word === current.currentWord));
        this.setState({correctWords: [...this.state.correctWords, this.state.words[indexCurrent]]});
    }
    saveIncorrectAnswer = () => {
        const {current} = this.state;
        const indexCurrent = this.state.words.findIndex(word => (word.word === current.currentWord));
        this.setState({incorrectWords: [...this.state.incorrectWords, this.state.words[indexCurrent]]});
    }

    callBackAnswer = async (answer) => {
       if(answer === this.isCorrectCurrentTranslate(this.state.current)) {
        if(this.state.answerFrom === 'rightAnswer' || this.state.answerFrom === '' || this.state.answerFrom === 'norightAnswer' || this.state.answerFrom === 'norightAnswer-2' ) {
            this.setState({answerFrom: 'rightAnswer-2'});            
        } else if(this.state.answerFrom === 'rightAnswer-2') {
            this.setState({answerFrom: 'rightAnswer'});
        }
        this.setState({score: this.state.score + this.state.multiScore});
        this.setState({numberCorrect: this.state.numberCorrect + 1}, () => {
            if(!(this.state.numberCorrect % 3) && this.state.numberCorrect && this.state.multiScore < 30) {
                this.setState({multiScore: this.state.multiScore + 10});
            }
        });
        if(this.state.isAuth) {
           const isWord = await isUserWord(this.state.words[this.state.currentCount].id);
           if(isWord != -1) {
               if(!isWord) {
                   console.log(isWord,'isWord');
                    const toCalc = await toCalcProgressWord(this.state.group + '', this.state.words[this.state.currentCount].id, true);
                    console.log(toCalc, 'toCalc');
                     if(toCalc) {
                        this.setState({numberNewWords: this.state.numberNewWords + 1});
                    }
               } else {
                    const toCalc = await toCalcProgressWord(this.state.group + '', this.state.words[this.state.currentCount].id, true);
                    if(toCalc) {
                        const data = await getUserWord(this.state.words[this.state.currentCount].id);
                        if(data) {
                            if(data.optional.status === 'learned') {
                                this.setState({numberLearnedWords: this.state.numberLearnedWords + 1})
                            }
                        }
                    }
               }
           } 
        //    await toCalcProgressWord(this.state.group + '', this.state.words[this.state.currentCount].id, true);   
        }
        this.saveCorrectAnswer();
        this.changeCurrent();

       } else {
           this.saveIncorrectAnswer();
           if (this.state.numberCorrect > this.state.maxNumberCorrect) {
               this.setState({maxNumberCorrect: this.state.numberCorrect});
           }
           this.setState({numberCorrect: 0}, () => {
                this.setState({multiScore: 10});
            });
            if(this.state.answerFrom === 'norightAnswer' || this.state.answerFrom === '' || this.state.answerFrom === 'rightAnswer' || this.state.answerFrom === 'rightAnswer-2') {
                this.setState({answerFrom: 'norightAnswer-2'});            
            } else if (this.state.answerFrom === 'norightAnswer-2') {
                this.setState({answerFrom: 'norightAnswer'});
            }
            if(this.state.isAuth) {
                const isWord = await isUserWord(this.state.words[this.state.currentCount].id);
                if(isWord != -1) {
                    if(!isWord) {
                         const toCalc = await toCalcProgressWord(this.state.group + '', this.state.words[this.state.currentCount].id, true);
                         if(toCalc) {
                             this.setState({numberNewWords: this.state.numberNewWords + 1});
                         }
                    } else {
                        await toCalcProgressWord(this.state.group + '', this.state.words[this.state.currentCount].id, false);
                    }
                }
            }            
           this.changeCurrent();
       }
    }

    callBackFinishTimer = () => {
        this.setState({finishTimer: true});
    }

    callBackGameAgain = async() => {
        await this.callbackSendStatistic();
        this.init();
    }

    init = () => {
        this.setState({score: 0, numberCorrect: 0, multiScore: 10, finishTimer: false,
            correctWords: [], incorrectWords: [],
            current: {
                currentWord: '',
                currentTranslate: '',
            },
            currentCount: 0,
            overflowLength: false,
            answerFrom: '',
            numberNewWords: 0,
            numberLearnedWords: 0,
            maxNumberCorrect: 0,  }, this.initShuffle);
    }

    initShuffle = () => {
        this.setState({shuffleWords: [...this.state.words.map((item) => item.word)]});
        this.setState({shuffleWords: this.shuffle(this.state.shuffleWords)}); 

        this.setState({shuffleTranslates: [...this.state.words.map((item) => item.wordTranslate)]});
        this.setState({shuffleTranslates: this.shuffle(this.state.shuffleTranslates)});     
        
        this.setState({current: {currentWord: this.state.shuffleWords[this.state.currentCount],
            currentTranslate: this.state.shuffleTranslates[this.state.currentCount]}});
    }

    isAuthSet = () => {
        const isUser = localStorage.getItem('userInfo');
        if(isUser) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const {isAuth} = userInfo;
            if(isAuth) {
                this.setState({isAuth: true});
            }
        }   
    }

    async componentDidMount() {
        let group;
        let page;
        this.isAuthSet();

        if(this.props.group !== undefined && this.props.page !== undefined) {
            group = this.props.group;
            this.setState({group: group});
            page = this.props.page;            
            this.setState({countPages: page}, () => {
                this.setState({totalPages: this.state.countPages});
            });
            const response = await fetch(`https://rslang-react-app.herokuapp.com/words?page=${page}&group=${group}`);
            const data = await response.json();
            this.setState({words: data});    
        } else {
            group = (+this.props.levelGameSprint) - 1;  
            this.setState({group: group});         
            for(let i = 0; i < 30; i++){
                const response = await fetch(`https://rslang-react-app.herokuapp.com/words?page=${i}&group=${group}`);
                const data = await response.json();
                this.setState({words: this.state.words.concat(data)});            
            }
        }
        this.setState({loading: false});

        this.setState({shuffleWords: [...this.state.words.map((item) => item.word)]});
        this.setState({shuffleWords: this.shuffle(this.state.shuffleWords)}); 

        this.setState({shuffleTranslates: [...this.state.words.map((item) => item.wordTranslate)]});
        this.setState({shuffleTranslates: this.shuffle(this.state.shuffleTranslates)});     
        
        this.setState({current: {currentWord: this.state.shuffleWords[this.state.currentCount],
            currentTranslate: this.state.shuffleTranslates[this.state.currentCount]}});
    }

    render () {
        const { loading, current, score, multiScore, finishTimer,
                correctWords, incorrectWords, overflowLength, answerFrom} = this.state;

        return <div className="container-main-sprint">
            {
                loading ? (<div className="loading-sprint">
                    <div className="spinner-grow text-danger" role="status">           
                    </div>
                </div>) :
                (finishTimer || overflowLength) ? <StatisticGameSprint correctWords={correctWords} incorrectWords={incorrectWords}
                    callBackGameAgain={this.callBackGameAgain} callbackSendStatistic={this.callbackSendStatistic} /> :
                <FieldGameSprint current={current} callBackAnswer={this.callBackAnswer} 
                 score={score} multiScore={multiScore} callBackFinishTimer={this.callBackFinishTimer}
                 answerFrom={answerFrom}/>
            }         
        </div>
    }
}

export {MainGameSprint}