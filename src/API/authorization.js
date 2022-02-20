import { CONSTANTS } from '../constants/constants.js';
import $api from './http.js';

class Authorization {
  static async createUser(userData) {
    return $api.post(CONSTANTS.endPoint.users, userData);
  }

  static async signIn(userData) {
    return $api.post(CONSTANTS.endPoint.signIn, userData);
  }
}
export default Authorization;
