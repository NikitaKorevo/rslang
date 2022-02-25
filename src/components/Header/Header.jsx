import React, { useContext } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ROUTES from '../../constants/routes';
import { Context } from '../../index';

const Header = observer(() => {
  const { rootStore } = useContext(Context);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo.name;
  return (
    <header className="Header">
      <nav className="nav">
        {rootStore.authStore.isAuth ? (
          <div className="navUser">
            <div className="avatar-logo" />
            <div>{userName}</div>
          </div>
        ) : null}

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
            {rootStore.authStore.isAuth ? (
              <div
                className="nav__link sign-out-btn"
                onClick={() => {
                  rootStore.authStore.signOut();
                }}
              >
                Выйти
              </div>
            ) : (
              <NavLink className="nav__link" to={ROUTES.SIGN_IN}>
                Войти
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
