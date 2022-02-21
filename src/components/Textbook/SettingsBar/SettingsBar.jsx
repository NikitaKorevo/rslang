import { NavLink, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Dropdown, Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import s from './SettingsBar.module.scss';
import { Context } from '../../../index';
import ROUTES from '../../../constants/routes';

const SettingsBar = observer(({ loadWords, loadHardWords, setUserWordsList }) => {
  const { rootStore } = useContext(Context);
  const changeSection = async (num) => {
    rootStore.textbookStore.setTextbookGroup(num);
    Number(localStorage.getItem('textbookGroup')) === 6 ? await loadHardWords() : await loadWords();
    setUserWordsList();
  };

  const setCurrentGroupName = (pageNum) => {
    switch (pageNum) {
      case 0:
        return 'A1';
      case 1:
        return 'A2';
      case 2:
        return 'B1';
      case 3:
        return 'B2';
      case 4:
        return 'C1';
      case 5:
        return 'C2';
      case 6:
        return 'Сложные слова';
      default:
        return 'A1';
    }
  };

  return (
    <div className={s.settingsBar}>
      <Dropdown>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          {setCurrentGroupName(Number(localStorage.getItem('textbookGroup')))}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(0);
            }}
          >
            A1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(1);
            }}
          >
            A2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(2);
            }}
          >
            B1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(3);
            }}
          >
            B2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(4);
            }}
          >
            C1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(5);
            }}
          >
            C2
          </Dropdown.Item>
          {rootStore.authStore.isAuth ? (
            <Dropdown.Item
              onClick={async () => {
                await changeSection(6);
              }}
            >
              Сложные слова
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="warning" className={s.menuItem}>
        <NavLink className="nav__link" to={ROUTES.AUDIO_CALL}>
          Аудиовызов
        </NavLink>
      </Button>
      <Button variant="warning" className={s.menuItem}>
        <Link
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            color: '#000'
          }}
          to={{
            pathname: '/sprint',
            search: '',
            hash: 'fromTextbook',
            something: { fromTextBook: 1 }
          }}
        >
          Спринт
        </Link>
      </Button>
      <Dropdown className={s.settingsDropdown}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Настройки
        </Dropdown.Toggle>
        <Dropdown.Menu className={s.dropdownMenu}>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Перевод"
              onChange={() => {
                rootStore.textbookStore.showTranslation
                  ? rootStore.textbookStore.setShowTranslation(false)
                  : rootStore.textbookStore.setShowTranslation(true);
              }}
              checked={rootStore.textbookStore.showTranslation}
            />
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default SettingsBar;
