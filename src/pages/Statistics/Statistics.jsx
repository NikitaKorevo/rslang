import React, { useState, useEffect } from 'react';
import UsersStatisticAPI from '../../API/usersStatisticAPI';
import { getCurrentDate } from '../../utils/utils';
import './Statistics.scss';

function Statistics() {
  /* const [statistics, setStatistics] = useState(); */
  const [audioCallStatistics, setAudioCallStatistics] = useState(null);
  const [sprintStatistics, setSprintStatistics] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    async function getUserStatistic() {
      const date = getCurrentDate();
      console.log('date', date);
      setCurrentDate(date);
      const userStatistics = await UsersStatisticAPI.getUserStatistic();

      const dataAudioCallStatistics = userStatistics.optional.audioCall[date];
      const percentageCorrectAnswersAudioCall =
        (dataAudioCallStatistics.rightAnswers /
          (dataAudioCallStatistics.rightAnswers + dataAudioCallStatistics.wrongAnswers)) *
        100;
      setAudioCallStatistics({ ...dataAudioCallStatistics, percentageCorrectAnswersAudioCall });

      const dataSprintStatistics = userStatistics.optional.sprint[date];
      const percentageCorrectAnswersSprint =
        (dataSprintStatistics.rightAnswers /
          (dataSprintStatistics.rightAnswers + dataSprintStatistics.wrongAnswers)) *
        100;
      setSprintStatistics({ ...dataSprintStatistics, percentageCorrectAnswersSprint });
    }
    getUserStatistic();
  }, []);

  return (
    <div className="Statistics">
      <button type="button" onClick={() => UsersStatisticAPI.getUserStatistic()}>
        get
      </button>
      <button type="button" disabled onClick={() => UsersStatisticAPI.putUserStatistic(5)}>
        put
      </button>
      <button type="button" onClick={() => UsersStatisticAPI.pushUserStatistic('audioCall', 13, 7)}>
        push
      </button>

      <h2 className="Statistics__title">Статистика ({currentDate})</h2>
      <section className="Statistics__game-statistic">
        <h3 className="game-statistic__subtitle">Аудиовызов</h3>
        <ul className="game-statistic__list">
          <li className="game-statistic__item">новых слов за день: {}</li>
          <li className="game-statistic__item">
            процент правильных ответов:{' '}
            {audioCallStatistics?.percentageCorrectAnswersAudioCall || 0}%
          </li>
          <li className="game-statistic__item">
            лучшая серия правильных ответов: {audioCallStatistics?.longestWinningStreak || 0}
          </li>
        </ul>
      </section>

      <section className="Statistics__game-statistic">
        <h3 className="game-statistic__subtitle">Спринт</h3>
        <ul className="game-statistic__list">
          <li className="game-statistic__item">Количество новых слов за день: {}</li>
          <li className="game-statistic__item">
            Процент правильных ответов: {sprintStatistics?.percentageCorrectAnswersSprint || 0}%
          </li>
          <li className="game-statistic__item">
            лучшая серия правильных ответов: {sprintStatistics?.longestWinningStreak || 0}
          </li>
        </ul>
      </section>

      <section className="Statistics__game-statistic">
        <h3 className="game-statistic__subtitle">Слова</h3>
        <ul className="game-statistic__list">
          <li className="game-statistic__item">новых слов за день: {}</li>
          <li className="game-statistic__item">процент правильных ответов: {}%</li>
          <li className="game-statistic__item">количество изученных слов {}</li>
        </ul>
      </section>
    </div>
  );
}

export default Statistics;
