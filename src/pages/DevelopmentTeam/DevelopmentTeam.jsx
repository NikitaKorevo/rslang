import React from 'react';
import './DevelopmentTeam.scss';
import githubLogo from '../../assets/svg/github-logo.svg';

function DevelopmentTeam() {
  return (
    <div className="DevelopmentTeam">
      <h2 className="DevelopmentTeam__title">О команде</h2>

      <div className="DevelopmentTeam-container">
        <ul className="DevelopmentTeam__list">
          <li className="DevelopmentTeam__item">
            <div className="DevelopmentTeam__content">
              <img
                className="DevelopmentTeam__avatar"
                src="https://avatars.githubusercontent.com/u/48645737?v=4"
                alt="avatar"
              />
              <h3 className="DevelopmentTeam__name">Никита Корево</h3>
              <p className="DevelopmentTeam__position">Разработчик</p>
              <ol className="DevelopmentTeam__attainment-list">
                <li className="attainment-list__item">Игра «Аудиовызов»</li>
                <li className="attainment-list__item">
                  Страницы: «Главная», «Статистика», «Команда»
                </li>
                <li className="attainment-list__item">Создание API</li>
              </ol>
            </div>
            <div className="DevelopmentTeam__github-link-container">
              <a
                className="DevelopmentTeam__github-link"
                href="https://github.com/NikitaKorevo"
                target="_blank"
                rel="noreferrer"
              >
                <img className="DevelopmentTeam__github-logo" src={githubLogo} alt="github-logo" />
              </a>
            </div>
          </li>

          <li className="DevelopmentTeam__item">
            <div className="DevelopmentTeam__content">
              <img
                className="DevelopmentTeam__avatar"
                src="https://avatars.githubusercontent.com/u/86767943?v=4"
                alt="avatar"
              />
              <h3 className="DevelopmentTeam__name">Александр Зданович</h3>
              <p className="DevelopmentTeam__position">Разработчик</p>
              <ol className="DevelopmentTeam__attainment-list">
                <li className="attainment-list__item">Игра «Спринт»</li>
                <li className="attainment-list__item">Создание API</li>
              </ol>
            </div>
            <div className="DevelopmentTeam__github-link-container">
              <a
                className="DevelopmentTeam__github-link"
                href="https://github.com/alexzdch"
                target="_blank"
                rel="noreferrer"
              >
                <img className="DevelopmentTeam__github-logo" src={githubLogo} alt="github-logo" />
              </a>
            </div>
          </li>

          <li className="DevelopmentTeam__item">
            <div className="DevelopmentTeam__content">
              <img
                className="DevelopmentTeam__avatar"
                src="https://avatars.githubusercontent.com/u/57017829?v=4"
                alt="avatar"
              />
              <h3 className="DevelopmentTeam__name">Артем Самонов</h3>
              <p className="DevelopmentTeam__position">Разработчик</p>
              <ol className="DevelopmentTeam__attainment-list">
                <li className="attainment-list__item">Учебник</li>
                <li className="attainment-list__item">Страницы: «Регистрация», «Авторизация»</li>
                <li className="attainment-list__item">Создание API</li>
              </ol>
            </div>
            <div className="DevelopmentTeam__github-link-container">
              <a
                className="DevelopmentTeam__github-link"
                href="https://github.com/artemgomel89"
                target="_blank"
                rel="noreferrer"
              >
                <img className="DevelopmentTeam__github-logo" src={githubLogo} alt="github-logo" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DevelopmentTeam;
