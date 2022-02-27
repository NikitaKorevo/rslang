import React from 'react';
import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <div className="Home__application-naming">
        <h1 className="application-naming__title">RSlang</h1>
        <h2 className="application-naming__subtitle">Изучайте английский в игровой форме</h2>
      </div>

      <div className="Home__application-features">
        <ul className="application-features__list">
          <li className="application-features__item">
            <h3 className="application-features__title">Учебник</h3>
            <p className="application-features__text">
              изучайте тысячи новых слов разделенных по уровням сложности
            </p>
          </li>
          <li className="application-features__item">
            <h3 className="application-features__title">Аудиовызов</h3>
            <p className="application-features__text">
              Тренируйте понимания на слух английский речи
            </p>
          </li>
          <li className="application-features__item">
            <h3 className="application-features__title">Спринт</h3>
            <p className="application-features__text">
              Проверяйте на сколько быстро вспоминаете изучаемые слова
            </p>
          </li>
          <li className="application-features__item">
            <h3 className="application-features__title">Статистика</h3>
            <p className="application-features__text">Анализируйте прогресс изучения по дням</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
