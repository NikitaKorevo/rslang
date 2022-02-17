import { makeAutoObservable, runInAction } from 'mobx';
import AuthAPI from '../API/authAPI';

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
      return await AuthAPI.createUser(signUpData);
    } catch (e) {
      return e;
    }
  }

  async signIn(signInData) {
    try {
      const response = await AuthAPI.signIn(signInData);
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

  async updateTokens() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const refreshToken = userInfo.refreshToken;
    const userId = userInfo.userId;
    console.log(userId, refreshToken);
    try {
      const resp = await AuthAPI.getTokens(userId, refreshToken);
      const updatedUserData = {
        isAuth: this.isAuth,
        name: userInfo.name,
        userId: userInfo.userId,
        token: resp.data.token,
        refreshToken: resp.data.refreshToken
      };

      localStorage.setItem('userInfo', JSON.stringify(updatedUserData));

      console.log('REFRESH TOKEN: ', resp);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthStore;
