import { makeAutoObservable, runInAction } from 'mobx';
import Authorization from '../API/authorization';

class AuthStore {
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
      runInAction(() => {
        this.setAuth(true);

        const userData = {
          isAuth: this.isAuth,
          name: response.data.name,
          userId: response.data.userId,
          token: response.data.token,
          refreshToken: response.data.refreshToken
        };

        localStorage.setItem('userInfo', JSON.stringify(userData));
      });

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

export default AuthStore;
