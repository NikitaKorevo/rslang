import { makeAutoObservable } from 'mobx';
import Authorization from '../API/authorization.js';

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

  currentTextbookPage = 1;
  textbookGroup = 1;

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
