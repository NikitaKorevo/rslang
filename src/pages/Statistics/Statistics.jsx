import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import UsersStatisticAPI from '../../API/usersStatisticAPI';
import { getCurrentDate } from '../../utils/utils';
import './Statistics.scss';
import { getUserWords, getUserWord } from '../../API/progress';

function Statistics() {
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [audioCallStatistics, setAudioCallStatistics] = useState(null);
  const [sprintStatistics, setSprintStatistics] = useState(null);
  const [wordStatistics, setWordStatistics] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    async function getUserStatistic() {
      const date = getCurrentDate();
      setCurrentDate(date);
      const userStatistics = await UsersStatisticAPI.getUserStatistic();

      const dataAudioCallStatistics = userStatistics.optional.audioCall[date];
      if (dataAudioCallStatistics) {
        const percentageCorrectAnswersAudioCall =
          (dataAudioCallStatistics.rightAnswers /
            (dataAudioCallStatistics.rightAnswers + dataAudioCallStatistics.wrongAnswers)) *
          100;
        setAudioCallStatistics({ ...dataAudioCallStatistics, percentageCorrectAnswersAudioCall });
      }

      const dataSprintStatistics = userStatistics.optional.sprint[date];
      if (dataSprintStatistics) {
        const percentageCorrectAnswersSprint =
          (dataSprintStatistics.rightAnswers /
            (dataSprintStatistics.rightAnswers + dataSprintStatistics.wrongAnswers)) *
          100;
        setSprintStatistics({ ...dataSprintStatistics, percentageCorrectAnswersSprint });
      }

      const dataWordStatistics = userStatistics.optional.words[date];
      if (dataWordStatistics) {
        const percentageCorrectAnswersWords =
          (dataWordStatistics.rightAnswers /
            (dataWordStatistics.rightAnswers + dataWordStatistics.wrongAnswers)) *
          100;
        setWordStatistics({ ...dataWordStatistics, percentageCorrectAnswersWords });
      }

      setIsContentLoading(false);
    }
    getUserStatistic();
  }, []);

  async function getUserStatistic() {
    console.log(await UsersStatisticAPI.getUserStatistic());
  }

  async function getUserWords2() {
    console.log(await getUserWords());
  }

  return (
    <div className="Statistics">
      <button type="button" onClick={() => getUserStatistic()}>
        get statistics in console
      </button>
      <button type="button" onClick={() => getUserWords2()}>
        getUserWords
      </button>

      <h2 className="Statistics__title">Статистика ({currentDate})</h2>
      <div className="Statistics__game-statistics-container">
        <section className="Statistics__game-statistics">
          <h3 className="game-statistics__subtitle">Аудиовызов</h3>
          <ul className="game-statistics__list">
            <li className="game-statistics__item">
              Новых слов за день: {audioCallStatistics?.amountNewWords || 0}
            </li>
            <li className="game-statistics__item">
              Процент правильных ответов:{' '}
              {audioCallStatistics?.percentageCorrectAnswersAudioCall || 0}%
            </li>
            <li className="game-statistics__item">
              Лучшая серия правильных ответов: {audioCallStatistics?.longestWinningStreak || 0}
            </li>
          </ul>
        </section>

        <section className="Statistics__game-statistics">
          <h3 className="game-statistics__subtitle">Спринт</h3>
          <ul className="game-statistics__list">
            <li className="game-statistics__item">
              новых слов за день: {sprintStatistics?.amountNewWords || 0}
            </li>
            <li className="game-statistics__item">
              Процент правильных ответов: {sprintStatistics?.percentageCorrectAnswersSprint || 0}%
            </li>
            <li className="game-statistics__item">
              Лучшая серия правильных ответов: {sprintStatistics?.longestWinningStreak || 0}
            </li>
          </ul>
        </section>

        <section className="Statistics__game-statistics">
          <h3 className="game-statistics__subtitle">Слова</h3>
          <ul className="game-statistics__list">
            <li className="game-statistics__item">
              новых слов за день: {wordStatistics?.amountNewWords || 0}
            </li>
            <li className="game-statistics__item">
              процент правильных ответов: {wordStatistics?.percentageCorrectAnswersWords || 0}%
            </li>
            <li className="game-statistics__item">
              количество изученных слов {wordStatistics?.amountLearnedWords || 0}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Statistics;
