import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';

function Header() {
  return (
    <header className="Header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.HOME}>
              Главная
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.TEXTBOOK}>
              Учебник
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.AUDIO_CALL}>
              Аудиовызов
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.SPRINT}>
              Спринт
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.STATISTICS}>
              Статистика
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.DEVELOPMENT_TEAM}>
              Команда
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={ROUTES.SIGN_IN}>
              Войти
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
