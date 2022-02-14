import React from 'react';
import s from '../../pages/Textbook/Textbook.module.scss';
import { CONSTANTS } from '../../constants/constants.js';

const TextbookCard = ({ card, pos, playAudio }) => {
  return (
    <div className={s.card} key={pos}>
      <div className={s.imgWrapper}>
        <div className={s.img} style={{ background: `url(${CONSTANTS.baseUrl}${card.image})` }} />
      </div>
      <div className={s.cardTextContainer}>
        <div className={s.word}>{card.word}</div>
        <div className={s.transcript}>
          <div className={s.spanTitle}>Transcription:</div>
          <div className={s.transcription}>{card.transcription}</div>
          <div
            className={s.playWordIcon}
            onClick={() => {
              playAudio(card.audio);
            }}
          />
        </div>
        <div className={[s.meaning, s.block].join(' ')}>
          <div className={s.spanTitle}>Meaning:</div>
          <div className={s.textMeaning} dangerouslySetInnerHTML={{ __html: card.textMeaning }} />
          <div
            className={s.playWordIcon}
            onClick={() => {
              playAudio(card.audioMeaning);
            }}
          />
        </div>
        <div className={[s.example, s.block].join(' ')}>
          <div className={s.spanTitle}>Example:</div>
          <div className={s.textExample} dangerouslySetInnerHTML={{ __html: card.textExample }} />
          <div
            className={s.playWordIcon}
            onClick={() => {
              playAudio(card.audioExample);
            }}
          />
        </div>
        <div className={[s.translatedBlock]}>
          <div className={s.translate}>
            <span className={s.spanTitle}>Перевод:</span>
            <span className={s.wordTranslate}>{card.wordTranslate}</span>
          </div>
          <div className={s.meaningTranslate}>
            <span className={s.spanTitle}>Значение:</span>
            <span className={s.textMeaningTranslate}>{card.textMeaningTranslate}</span>
          </div>
          <div className={s.exampletranslate}>
            <span className={s.spanTitle}>Пример:</span>
            <span className={s.textExampleTranslate}>{card.textExampleTranslate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextbookCard;
