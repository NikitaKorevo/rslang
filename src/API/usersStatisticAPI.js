import $api from './http';
import CONSTANTS from '../constants/constants';
import AuthStore from '../store/authStore';
import { getCurrentDate } from '../utils/utils';

class UsersStatisticAPI {
  static async getUserStatistic() {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { userId, token } = userInfo;

      const response = await $api.get(
        `${CONSTANTS.endPoint.users}/${userId}/${CONSTANTS.endPoint.statistics}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorNumber = error.toString().slice(-3);

      if (errorNumber === '401') {
        await new AuthStore().updateTokens();
      }

      if (errorNumber === '404') {
        return {
          optional: {
            audioCall: {
              null: 'null'
            },
            sprint: {
              null: 'null'
            },
            words: {
              null: 'null'
            }
          }
        };
      }
      return console.error(error);
    }
  }

  static async #putUserStatistic(content) {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { userId, token } = userInfo;

      const response = await $api.put(
        `${CONSTANTS.endPoint.users}/${userId}/${CONSTANTS.endPoint.statistics}`,
        content,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );
      return response;
    } catch (error) {
      return console.error(error);
    }
  }

  static EnumStatisticSection = {
    audioCall: 'audioCall',
    sprint: 'sprint',
    words: 'words'
  };

  static async pushUserStatistic(
    statisticSection,
    rightAnswersFromGame,
    wrongAnswersFromGame,
    longestWinningStreakFromGame
  ) {
    if (!UsersStatisticAPI.EnumStatisticSection[statisticSection]) {
      console.error('incorrect statistical section');
    }

    const allContent = await UsersStatisticAPI.getUserStatistic();
    const optionalSection = {
      optional: allContent.optional
    };
    console.log('optionalSection', optionalSection);

    const currentDate = getCurrentDate();

    if (statisticSection === 'audioCall' || statisticSection === 'sprint') {
      if (optionalSection.optional[statisticSection][currentDate]) {
        console.log('1');

        const { rightAnswers, wrongAnswers, longestWinningStreak } =
          optionalSection.optional[statisticSection][currentDate];

        const compareLongestWinningStreak =
          longestWinningStreak >= longestWinningStreakFromGame
            ? longestWinningStreak
            : longestWinningStreakFromGame;

        optionalSection.optional[statisticSection][currentDate] = {
          rightAnswers: rightAnswers + rightAnswersFromGame,
          wrongAnswers: wrongAnswers + wrongAnswersFromGame,
          longestWinningStreak: compareLongestWinningStreak
        };
      } else {
        /* add amountNewWords  */
        console.log('2');

        optionalSection.optional[statisticSection][currentDate] = {
          rightAnswers: rightAnswersFromGame,
          wrongAnswers: wrongAnswersFromGame,
          longestWinningStreak: longestWinningStreakFromGame
        };
      }
      console.log('optionalSection', optionalSection);
      return UsersStatisticAPI.#putUserStatistic(optionalSection);
    }
  }
}

export default UsersStatisticAPI;
