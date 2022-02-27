import AuthStore from './authStore';
import TextbookStore from './textbookStore';

export class RootStore {
  authStore = new AuthStore();
  textbookStore = new TextbookStore();
}

export default RootStore;
