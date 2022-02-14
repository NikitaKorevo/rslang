import React, { useEffect, useState } from 'react';
import s from './Textbook.module.scss';
import { getWords } from '../../API/textbook.js';
import { Dropdown, Pagination, Spinner } from 'react-bootstrap';
import { store } from '../../store/store.js';
import { CONSTANTS } from '../../constants/constants.js';
import TextbookCard from '../../components/TextbookCard/TextbookCard.jsx';

const Textbook = () => {
  const [words, updateWords] = useState([]);
  const [loadAnimation, setLoadAnimation] = useState(true);

  const loadWords = async () => {
    try {
      setLoadAnimation(true);
      const data = await getWords(store.textbookGroup, store.currentTextbookPage);
      updateWords(data.data);
      console.log(data.data[0]);
      setLoadAnimation(false);
    } catch (e) {
      console.log(e);
      setLoadAnimation(false);
    }
  };

  const changeChapter = (num) => {
    store.setTextbookGroup(num);
    loadWords();
  };

  useEffect(async () => {
    await loadWords();
  }, [store.currentTextbookPage, store.textbookGroup]);

  const playAudioHandler = (audioStr) => {
    const audioPath = `${CONSTANTS.baseUrl}${audioStr}`;
    const audio = new Audio(audioPath);
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((error) => console.log(error));
  };

  return (
    <div className={s.textbook}>
      <div className={s.container}>
        {loadAnimation ? (
          <div className={s.loadingIcon}>
            <Spinner animation="grow" role="status" className={s.spinner}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div>
            <h4>TextBook</h4>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Выбрать главу
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeChapter(0)}>Глава 1</Dropdown.Item>
                <Dropdown.Item onClick={() => changeChapter(1)}>Глава 2</Dropdown.Item>
                <Dropdown.Item onClick={() => changeChapter(2)}>Глава 3</Dropdown.Item>
                <Dropdown.Item onClick={() => changeChapter(3)}>Глава 4</Dropdown.Item>
                <Dropdown.Item onClick={() => changeChapter(4)}>Глава 5</Dropdown.Item>
                <Dropdown.Item onClick={() => changeChapter(5)}>Глава 6</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className={s.pagination}>
              <Pagination>
                <Pagination.First
                  onClick={async () => {
                    store.setFirstPage();
                    await loadWords();
                  }}
                  className={
                    store.currentTextbookPage === CONSTANTS.firstTextBookPage ? 'disabled' : null
                  }
                />
                <Pagination.Prev
                  onClick={async () => {
                    store.setPrevPage();
                    await loadWords();
                  }}
                  className={
                    store.currentTextbookPage === CONSTANTS.firstTextBookPage ? 'disabled' : null
                  }
                />
                <Pagination.Item>{store.currentTextbookPage + 1}</Pagination.Item>
                <Pagination.Next
                  onClick={async () => {
                    store.setNextPage();
                    await loadWords();
                  }}
                  className={
                    store.currentTextbookPage === CONSTANTS.textBookPagesAmount ? 'disabled' : null
                  }
                />
                <Pagination.Last
                  onClick={async () => {
                    store.setLastPage();
                    await loadWords();
                  }}
                  className={
                    store.currentTextbookPage === CONSTANTS.textBookPagesAmount ? 'disabled' : null
                  }
                />
              </Pagination>
            </div>
            <div className={s.cards}>
              {words.map((card, pos) => (
                <TextbookCard card={card} pos={pos} playAudio={playAudioHandler} />
              ))}
            </div>
            <div className={s.pagination}>
              <Pagination>
                <Pagination.First
                  onClick={async () => {
                    store.setFirstPage();
                    await loadWords();
                  }}
                />
                <Pagination.Prev
                  onClick={async () => {
                    store.setPrevPage();
                    await loadWords();
                  }}
                />
                <Pagination.Item>{store.currentTextbookPage + 1}</Pagination.Item>
                <Pagination.Next
                  onClick={async () => {
                    store.setNextPage();
                    await loadWords();
                  }}
                />
                <Pagination.Last
                  onClick={async () => {
                    store.setLastPage();
                    await loadWords();
                  }}
                />
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Textbook;
