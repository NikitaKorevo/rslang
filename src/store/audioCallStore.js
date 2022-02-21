import { makeAutoObservable } from 'mobx';

class AudioCall {
  gameLevel = '0';
  gamePage = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGameLevel(level = '0') {
    this.gameLevel = level.toString();
  }

  setGamePage(page = null) {
    this.gamePage = page ? page.toString() : null;
  }
}

export default new AudioCall();
