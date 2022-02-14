import { makeAutoObservable } from 'mobx';
import Authorization from '../API/authorization.js';
import { CONSTANTS } from '../constants/constants.js';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  guestData = {
    isAuth: false,
    name: null,
    userId: null,
    token: null,
    refreshToken: null
  };

  isAuth = false;

  currentTextbookPage = CONSTANTS.firstTextBookPage;
  textbookGroup = CONSTANTS.firstTextBookGroup;

  setTextbookGroup(num) {
    this.textbookGroup = num;
  }

  setNextPage() {
    if (this.currentTextbookPage < CONSTANTS.textBookPagesAmount) this.currentTextbookPage++;
  }

  setPrevPage() {
    if (this.currentTextbookPage > CONSTANTS.firstTextBookPage) this.currentTextbookPage--;
  }

  setFirstPage() {
    this.currentTextbookPage = CONSTANTS.firstTextBookPage;
  }

  setLastPage() {
    this.currentTextbookPage = CONSTANTS.textBookPagesAmount;
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  async signUp(signUpData) {
    try {
      return await Authorization.createUser(signUpData);
    } catch (e) {
      return e;
    }
  }

  async signIn(signInData) {
    try {
      const response = await Authorization.signIn(signInData);
      console.log(response.data);
      this.setAuth(true);

      const userData = {
        isAuth: this.isAuth,
        name: response.data.name,
        userId: response.data.userId,
        token: response.data.token,
        refreshToken: response.data.refreshToken
      };

      localStorage.setItem('userInfo', JSON.stringify(userData));
      return response;
    } catch (e) {
      return e;
    }
  }

  signOut() {
    this.setAuth(false);
    localStorage.setItem('userInfo', JSON.stringify(this.guestData));
  }
}

export const store = new Store();
