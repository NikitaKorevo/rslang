import React, { useState, useEffect } from 'react';
/* import { Spinner } from 'react-bootstrap'; */
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import usersStatisticAPI from '../../API/usersStatisticAPI';
import { getCurrentDate } from '../../utils/utils';
import './Statistics.scss';

function Statistics() {
  /* const [isContentLoading, setIsContentLoading] = useState(true); */
  const [audioCallStatistics, setAudioCallStatistics] = useState(null);
  const [sprintStatistics, setSprintStatistics] = useState(null);
  const [wordStatistics, setWordStatistics] = useState(null);
  const [dataForLineChartNewWords, setDataForLineChartNewWords] = useState([]);
  const [dataForLineChartLearnedWords, setDataForLineChartLearnedWords] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAuth = userInfo.isAuth || false;

  useEffect(() => {
    async function getUserStatistics() {
      const date = getCurrentDate();
      setCurrentDate(date);
      const userStatistics = await usersStatisticAPI.getUserStatistic();

      const dataAudioCallStatistics = userStatistics.optional.audioCall[date];
      if (dataAudioCallStatistics) {
        const percentageCorrectAnswersAudioCall = Math.ceil(
          (dataAudioCallStatistics.rightAnswers /
            (dataAudioCallStatistics.rightAnswers + dataAudioCallStatistics.wrongAnswers)) *
            100
        );
        setAudioCallStatistics({ ...dataAudioCallStatistics, percentageCorrectAnswersAudioCall });
      }

      const dataSprintStatistics = userStatistics.optional.sprint[date];
      if (dataSprintStatistics) {
        const percentageCorrectAnswersSprint = Math.ceil(
          (dataSprintStatistics.rightAnswers /
            (dataSprintStatistics.rightAnswers + dataSprintStatistics.wrongAnswers)) *
            100
        );
        setSprintStatistics({ ...dataSprintStatistics, percentageCorrectAnswersSprint });
      }

      const dataWordStatistics = userStatistics.optional.words[date];
      if (dataWordStatistics) {
        const percentageCorrectAnswersWords = Math.ceil(
          (dataWordStatistics.rightAnswers /
            (dataWordStatistics.rightAnswers + dataWordStatistics.wrongAnswers)) *
            100
        );
        setWordStatistics({ ...dataWordStatistics, percentageCorrectAnswersWords });
      }

      const gettingDataForLineChartNewWords = Object.keys(userStatistics.optional.words)
        .map((dateUserStatisticsWords) => {
          if (dateUserStatisticsWords === 'null') return 'null';
          return {
            date: dateUserStatisticsWords,
            amountNewWords: userStatistics.optional.words[dateUserStatisticsWords].amountNewWords
          };
        })
        .filter((el) => el !== 'null');
      setDataForLineChartNewWords(gettingDataForLineChartNewWords);

      let countLearnedWords = 0;
      const gettingDataForLineChartLearnedWords = Object.keys(userStatistics.optional.words)
        .map((dateUserStatisticsWords) => {
          if (dateUserStatisticsWords === 'null') return 'null';
          countLearnedWords +=
            userStatistics.optional.words[dateUserStatisticsWords].amountLearnedWords;
          return {
            date: dateUserStatisticsWords,
            amountLearnedWords: countLearnedWords
          };
        })
        .filter((el) => el !== 'null');
      setDataForLineChartLearnedWords(gettingDataForLineChartLearnedWords);
    }
    getUserStatistics();
  }, []);

  const lineChartNewWords = (
    <LineChart
      width={700}
      height={300}
      data={dataForLineChartNewWords}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="amountNewWords" stroke="#02a7a7" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  const lineChartLearnedWords = (
    <LineChart
      width={700}
      height={300}
      data={dataForLineChartLearnedWords}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="amountLearnedWords" stroke="#02a7a7" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <>
      <div hidden={isAuth} className="Statistics">
        <h3 className="Statistics__warning">
          Страница доступна только авторизованным пользователям
        </h3>
      </div>

      <div hidden={!isAuth} className="Statistics">
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

        <h2 className="Statistics__title">Графики</h2>
        <div className="Statistics__game-graphics-container">
          <div className="Statistics__game-graphics">
            <span className="game-graphics__subtitle">
              График, отображающий количество новых слов за каждый день изучения
            </span>
            {lineChartNewWords}
          </div>

          <div className="Statistics__game-graphics">
            <span className="game-graphics__subtitle">
              График, отображающий увеличение общего количества изученных слов по дням
            </span>
            {lineChartLearnedWords}
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
