import React, { useContext } from 'react';
import s from './SettingsBar.module.scss';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { NavLink, Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';


const SettingsBar = observer(({ loadWords, loadHardWords }) => {
  const { rootStore } = useContext(Context);
  const changeSection = async (num) => {
    rootStore.textbookStore.setTextbookGroup(num);
    Number(localStorage.getItem('textbookGroup')) === 6 ? await loadHardWords() : await loadWords();
  };

  return (
    <div className={s.settingsBar}>
      <Dropdown>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          {localStorage.getItem('groupName')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(0);
              localStorage.setItem('groupName', 'A1');
            }}
          >
            A1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(1);
              localStorage.setItem('groupName', 'A2');
            }}
          >
            A2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(2);
              localStorage.setItem('groupName', 'B1');
            }}
          >
            B1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(3);
              localStorage.setItem('groupName', 'B2');
            }}
          >
            B2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(4);
              localStorage.setItem('groupName', 'C1');
            }}
          >
            C1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(5);
              localStorage.setItem('groupName', 'C2');
            }}
          >
            C2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await changeSection(6);
              localStorage.setItem('groupName', 'Сложные слова');
            }}
          >
            Сложные слова
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="warning" className={s.menuItem}>
        Аудиовызов
      </Button>
      <Button variant="warning" className={s.menuItem}>
      <Link style={{display : 'block', width: '100%', height: '100%', textDecoration: 'none', color: '#000'}} to={{
         pathname: '/sprint',
         search: '',
         hash: 'fromTextbook',
         something: {fromTextBook:1}
      }}>
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
