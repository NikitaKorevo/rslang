import React from 'react';
import s from './TextbookCard.module.scss';
import CONSTANTS from '../../../constants/constants.js';
import store from '../../../store/store';
import { observer } from 'mobx-react-lite';

const TextbookCard = ({ card, pos, playAudio, isPlaying, setIsPlaying }) => {
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
        </div>
        <div className={[s.meaning, s.block].join(' ')}>
          <div className={s.spanTitle}>Meaning:</div>
          <div className={s.textMeaning} dangerouslySetInnerHTML={{ __html: card.textMeaning }} />
        </div>
        <div className={[s.example, s.block].join(' ')}>
          <div className={s.spanTitle}>Example:</div>
          <div className={s.textExample} dangerouslySetInnerHTML={{ __html: card.textExample }} />
        </div>
        {store.showTranslation ? (
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
        ) : (
          <div />
        )}
      </div>
      <div
        className={s.playWordIcon}
        onClick={async () => {
          if (!isPlaying) {
            setIsPlaying(true);
            await playAudio(card.audio, card.audioMeaning, card.audioExample);
          }
        }}
      />
    </div>
  );
};

export default observer(TextbookCard);
