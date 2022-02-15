import React, { useEffect, useState } from 'react';
import s from './Textbook.module.scss';
import { getWords } from '../../API/textbook.js';
import { Pagination, Spinner } from 'react-bootstrap';
import { store } from '../../store/store.js';

const Textbook = () => {
  const [words, updateWords] = useState([]);
  const [loadAnimation, setLoadAnimation] = useState(true);

  const loadWords = async () => {
    try {
      setLoadAnimation(true);
      const data = await getWords(store.currentTextbookPage, store.textbookGroup);
      updateWords(data.data);
      console.log(data.headers);
      setLoadAnimation(false);
    } catch (e) {
      console.log(e);
      setLoadAnimation(false);
    }
  };

  useEffect(async () => {
    await loadWords();
  }, []);

  const cardList = words?.map((card, pos) => {
    return (
      <div className={s.card} key={pos}>
        <div className={s.imgContainer}>
          <img src="" alt="" />
        </div>
        <div className={s.cardTextContainer}>
          <span className={s.word}>{card.word}</span>
          <span className={s.transcription}>{card.transcription}</span>
          <div className={s.wordTranslate}>{card.wordTranslate}</div>
          <div className={s.textExample}>{card.textExample}</div>
          <div className={s.textExampleTranslate}>{card.textExampleTranslate}</div>
          <div className={s.textMeaning}>{card.textMeaning}</div>
          <div className={s.textMeaningTranslate}>{card.textMeaningTranslate}</div>
        </div>
      </div>
    );
  });

  return (
    <div className={s.Textbook}>
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
            <div className={s.pagination}>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />

                <Pagination.Item active>{1}</Pagination.Item>

                <Pagination.Item>{30}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
            <div className={s.cards}>{cardList}</div>
            <div className={s.pagination}>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />

                <Pagination.Item active>{1}</Pagination.Item>

                <Pagination.Item>{30}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Textbook;
