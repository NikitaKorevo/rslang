import CONSTANTS from '../constants/constants';
import $api from './http';

class Authorization {
  static async createUser(userData) {
    return $api.post(CONSTANTS.endPoint.users, userData);
  }

  static async signIn(userData) {
    return $api.post(CONSTANTS.endPoint.signIn, userData);
  }
}
export default Authorization;
