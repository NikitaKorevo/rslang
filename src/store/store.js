import { makeAutoObservable } from 'mobx';
import Authorization from '../API/authorization.js';

export default class Store {
  user = {};

  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  async signUp(signUpData) {
    try {
      const response = await Authorization.createUser(signUpData);
      localStorage.setItem('token', response.data.token);
      this.setAuth(true);
      this.setUser(response.data);
      return response;
    } catch (e) {
      return e;
    }
  }

  async signIn(signInData) {
    try {
      const response = await Authorization.signIn(signInData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', response.data.name);
      this.setAuth(true);
      this.setUser(response.data);
      return response;
    } catch (e) {
      return e;
    }
  }

  signOut() {
    this.setAuth(false);
    localStorage.clear();
  }
}
