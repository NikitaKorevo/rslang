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
    localStorage.setItem('textbookShowTranslation', String(this.showTranslation));
  }

  setTextbookGroup(num) {
    this.textbookGroup = num;
    localStorage.setItem('textbookGroup', this.textbookGroup);
  }

  setNextPage() {
    if (this.currentTextbookPage < CONSTANTS.textBookPagesAmount) this.currentTextbookPage += 1;
    localStorage.setItem('currentPage', this.currentTextbookPage);
  }

  setPrevPage() {
    if (this.currentTextbookPage > CONSTANTS.firstTextBookPage) this.currentTextbookPage -= 1;
    localStorage.setItem('currentPage', this.currentTextbookPage);
  }

  setFirstPage() {
    this.currentTextbookPage = CONSTANTS.firstTextBookPage;
    localStorage.setItem('currentPage', this.currentTextbookPage);
  }

  setLastPage() {
    this.currentTextbookPage = CONSTANTS.textBookPagesAmount;
    localStorage.setItem('currentPage', this.currentTextbookPage);
  }
}

export default TextbookStore;
