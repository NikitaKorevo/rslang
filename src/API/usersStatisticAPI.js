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
    sprint: 'sprint'
  };

  static async updateUserStatistic(
    statisticSection,
    rightAnswersFromGame,
    wrongAnswersFromGame,
    longestWinningStreakFromGame,
    amountNewWordsFromGame,
    amountLearnedWordsFromGame
  ) {
    if (!UsersStatisticAPI.EnumStatisticSection[statisticSection]) {
      console.error('incorrect statistical section');
    }

    const allContent = await UsersStatisticAPI.getUserStatistic();
    const optionalSection = {
      optional: allContent.optional
    };

    const currentDate = getCurrentDate();

    if (optionalSection.optional[statisticSection][currentDate]) {
      const { rightAnswers, wrongAnswers, longestWinningStreak, amountNewWords } =
        optionalSection.optional[statisticSection][currentDate];

      const compareLongestWinningStreak =
        longestWinningStreak >= longestWinningStreakFromGame
          ? longestWinningStreak
          : longestWinningStreakFromGame;

      optionalSection.optional[statisticSection][currentDate] = {
        rightAnswers: rightAnswers + rightAnswersFromGame,
        wrongAnswers: wrongAnswers + wrongAnswersFromGame,
        longestWinningStreak: compareLongestWinningStreak,
        amountNewWords: amountNewWords + amountNewWordsFromGame
      };
    } else {
      optionalSection.optional[statisticSection][currentDate] = {
        rightAnswers: rightAnswersFromGame,
        wrongAnswers: wrongAnswersFromGame,
        longestWinningStreak: longestWinningStreakFromGame,
        amountNewWords: amountNewWordsFromGame
      };
    }
    await UsersStatisticAPI.#putUserStatistic(optionalSection);
    const response = await UsersStatisticAPI.updateWordUserStatistic(
      amountLearnedWordsFromGame,
      rightAnswersFromGame,
      wrongAnswersFromGame,
      amountNewWordsFromGame
    );
    return response;
  }

  static async updateWordUserStatistic(
    amountLearnedWordsFromGame,
    rightAnswersFromGame = 0,
    wrongAnswersFromGame = 0,
    amountNewWordsFromGame = 0
  ) {
    const allContent = await UsersStatisticAPI.getUserStatistic();
    const optionalSection = {
      optional: allContent.optional
    };

    const currentDate = getCurrentDate();

    if (optionalSection.optional.words[currentDate]) {
      const { amountLearnedWords, rightAnswers, wrongAnswers, amountNewWords } =
        optionalSection.optional.words[currentDate];

      optionalSection.optional.words[currentDate] = {
        rightAnswers: rightAnswers + rightAnswersFromGame,
        wrongAnswers: wrongAnswers + wrongAnswersFromGame,
        amountLearnedWords: amountLearnedWords + amountLearnedWordsFromGame,
        amountNewWords: amountNewWords + amountNewWordsFromGame
      };
    } else {
      optionalSection.optional.words[currentDate] = {
        rightAnswers: rightAnswersFromGame,
        wrongAnswers: wrongAnswersFromGame,
        amountLearnedWords: amountLearnedWordsFromGame,
        amountNewWords: amountNewWordsFromGame
      };
    }
    const response = await UsersStatisticAPI.#putUserStatistic(optionalSection);
    return response;
  }
}

export default UsersStatisticAPI;
