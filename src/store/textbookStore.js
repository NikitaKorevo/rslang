import { makeAutoObservable } from 'mobx';
import CONSTANTS from '../constants/constants';

class TextbookStore {
  constructor() {
    makeAutoObservable(this);
  }

  currentTextbookPage = CONSTANTS.firstTextBookPage;

  textbookGroup = CONSTANTS.firstTextBookGroup;

  showTranslation = true;

  setShowTranslation(bool) {
    this.showTranslation = bool;
  }

  setTextbookGroup(num) {
    this.textbookGroup = num;
  }

  setNextPage() {
    if (this.currentTextbookPage < CONSTANTS.textBookPagesAmount) this.currentTextbookPage += 1;
  }

  setPrevPage() {
    if (this.currentTextbookPage > CONSTANTS.firstTextBookPage) this.currentTextbookPage -= 1;
  }

  setFirstPage() {
    this.currentTextbookPage = CONSTANTS.firstTextBookPage;
  }

  setLastPage() {
    this.currentTextbookPage = CONSTANTS.textBookPagesAmount;
  }
}

export default TextbookStore;
