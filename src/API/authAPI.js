import CONSTANTS from '../constants/constants';
import $api from './http';

class AuthAPI {
  //Во всех случаях возвращается response
  static async createUser(userData) {
    return $api.post(CONSTANTS.endPoint.users, userData);
  }

  static async signIn(userData) {
    return $api.post(CONSTANTS.endPoint.signIn, userData);
  }

  static async getTokens(userId, refreshToken) {
    return $api.get(`${CONSTANTS.endPoint.users}/${userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json'
      }
    });
  }
}
export default AuthAPI;
