import axios from 'axios';
import { CONSTANTS } from '../constants/constants.js';

class Authorization {
  static createNewUser(userData) {
    axios
      .post(`${CONSTANTS.baseUrl}/${CONSTANTS.users}`, userData)
      .then((res) => console.log(res.status))
      .catch((res) => console.log(res.message));
  }
}

Authorization.createNewUser({ name: 'Ger', email: 'hm2341@il.ru', password: 'qwer1234T' });

export default Authorization;
