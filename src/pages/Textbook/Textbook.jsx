import React, { useContext, useEffect, useState } from 'react';
import s from './Textbook.module.scss';
import { getWords } from '../../API/textbook.js';
import { Context } from '../../store/store.js';

const Textbook = () => {
  const { store } = useContext(Context);
  const [words, updateWords] = useState({});

  useEffect(async () => {
    const data = await getWords(store.currentTextbookPage, store.textbookGroup);
    updateWords(data.data);
  }, []);

  const cardList = words.map((card, pos) => {
    return (
      <div className={s.card} key={pos}>
        <div className={s.imgContainer}>
          <img src="" alt="" />
        </div>
        <span className={s.word}>{card.word}</span>
        <span className={s.transcription}>{card.transcription}</span>
        <div className={s.wordTranslate}>{card.wordTranslate}</div>
        <div className={s.textExample}>{card.textExample}</div>
        <div className={s.textExampleTranslate}>{card.textExampleTranslate}</div>
        <div className={s.textMeaning}>{card.textMeaning}</div>
        <div className={s.textMeaningTranslate}>{card.textMeaningTranslate}</div>
      </div>
    );
  });

  return (
    <div className={s.Textbook}>
      <div className={s.container}>
        <div className={s.cards}>{cardList}</div>
      </div>
    </div>
  );
};

export default Textbook;
