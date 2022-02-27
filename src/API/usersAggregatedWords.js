import $api from './http';
import CONSTANTS from '../constants/constants';

class UsersAggregatedWords {
  static async getAmountNewWords() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { userId, token } = userInfo;
    const filter =
      '{"$or":[{"userWord.optional.status":"new"}, {"userWord.optional.status":"learned"}, {"userWord.optional.status":"hard"}]}';

    try {
      const response = await $api.get(
        `${CONSTANTS.endPoint.users}/${userId}/${CONSTANTS.endPoint.aggregatedWords}?wordsPerPage=3600&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );
      return response.data[0].totalCount[0]?.count || 0;
    } catch (error) {
      return console.error(error);
    }
  }

  static async getAmountLearnedWords() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { userId, token } = userInfo;
    const filter = '{"userWord.optional.status":"learned"}';

    try {
      const response = await $api.get(
        `${CONSTANTS.endPoint.users}/${userId}/${CONSTANTS.endPoint.aggregatedWords}?wordsPerPage=3600&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );
      return response.data[0].totalCount[0]?.count || 0;
    } catch (error) {
      return console.error(error);
    }
  }
}

export default UsersAggregatedWords;
