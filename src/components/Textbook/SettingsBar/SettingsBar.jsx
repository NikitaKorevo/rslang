import React from 'react';
import s from './SettingsBar.module.scss';
import { Dropdown, Form } from 'react-bootstrap';
import store from '../../../store/store';
import { observer } from 'mobx-react-lite';

const SettingsBar = observer(({ loadWords }) => {
  const changeChapter = async (num) => {
    store.setTextbookGroup(num);
    await loadWords();
  };

  return (
    <div className={s.settingsBar}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Раздел {store.textbookGroup + 1}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={async () => await changeChapter(0)}>Раздел 1</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(1)}>Раздел 2</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(2)}>Раздел 3</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(3)}>Раздел 4</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(4)}>Раздел 5</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(5)}>Раздел 6</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={s.settingsDropdown}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Настройки
        </Dropdown.Toggle>
        <Dropdown.Menu className={s.dropdownMenu}>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Скрыть перевод"
              onChange={() => {
                store.showTranslation
                  ? store.setShowTranslation(false)
                  : store.setShowTranslation(true);
              }}
              checked={store.showTranslation}
            />
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default SettingsBar;
