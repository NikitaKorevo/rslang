import { CONSTANTS } from '../constants/constants.js';

class Authorization {
  static async createUser(userData) {
    try {
      const resp = await fetch(`${CONSTANTS.baseUrl}${CONSTANTS.endPoint.users}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      return resp.status;
    } catch (e) {
      return await e.status;
    }
  }

  static async logInUser(userData) {
    try {
      const resp = await fetch(`${CONSTANTS.baseUrl}${CONSTANTS.endPoint.signIn}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      return resp.json();
    } catch (e) {
      return await e.status;
    }
  }
}
export default Authorization;

console.log(`${CONSTANTS.baseUrl}${CONSTANTS.endPoint.signIn}`);
