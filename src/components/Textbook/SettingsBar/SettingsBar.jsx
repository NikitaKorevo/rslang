import React, { useContext } from 'react';
import s from './SettingsBar.module.scss';
import { Dropdown, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';

const SettingsBar = observer(({ loadWords }) => {
  const { rootStore } = useContext(Context);
  const changeChapter = async (num) => {
    rootStore.textbookStore.setTextbookGroup(num);
    await loadWords();
  };

  return (
    <div className={s.settingsBar}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Раздел {rootStore.textbookStore.textbookGroup + 1}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={async () => await changeChapter(0)}>Раздел 1</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(1)}>Раздел 2</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(2)}>Раздел 3</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(3)}>Раздел 4</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(4)}>Раздел 5</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(5)}>Раздел 6</Dropdown.Item>
          <Dropdown.Item onClick={async () => await changeChapter(6)}>Раздел 7</Dropdown.Item>
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
