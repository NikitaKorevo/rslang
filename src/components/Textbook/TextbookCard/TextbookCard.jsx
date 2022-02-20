import React, { useContext, useState } from 'react';
import s from './TextbookCard.module.scss';
import CONSTANTS from '../../../constants/constants.js';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { createUserWord } from '../../../API/textbookAPI';
import * as textbookAPI from '../../../API/textbookAPI';

const TextbookCard = ({
  card,
  pos,
  playAudio,
  isPlaying,
  setIsPlaying,
  hardWordsId,
  learnedWordsId
}) => {
  const { rootStore } = useContext(Context);
  const [highlightHardWord, setHighlightHardWord] = useState(false);
  const [highlightLearnedWord, setHighlightLearnedWord] = useState(false);
  const [hideWord, setHideWord] = useState(false);

  const markWord = async (status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const userId = userInfo.userId;
      const wordId = card.id;
      console.log(wordId);
      const word = {
        difficulty: 'hard',
        optional: { status: status, testFieldBoolean: true }
      };
      const token = userInfo.token;

      const rawResponse = await createUserWord({ userId, wordId, word, token });

      if (rawResponse.status === 417) {
        console.log('Word has already added!');
      } else if (rawResponse.status === 401) {
        await rootStore.authStore.updateTokens();
        await markWord(status);
      } else {
        console.log(await rawResponse.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={
        hardWordsId.includes(card.id) || highlightHardWord
          ? [s.card, s.hardWord].join(' ')
          : learnedWordsId.includes(card.id) || highlightLearnedWord
          ? [s.card, s.learnedWord].join(' ')
          : hideWord
          ? [s.card, s.hide].join(' ')
          : s.card
      }
      key={pos}
    >
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
        {rootStore.textbookStore.showTranslation ? (
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
      <div className={s.cardIcons}>
        <div
          title="Воспроизвести предложение"
          className={[s.playWordIcon, s.cardIcon].join(' ')}
          onClick={async () => {
            if (!isPlaying) {
              setIsPlaying(true);
              await playAudio(card.audio, card.audioMeaning, card.audioExample);
            }
          }}
        />
        {rootStore.authStore.isAuth &&
        Number(localStorage.getItem('textbookGroup')) === 6 ? null : rootStore.authStore.isAuth ? (
          <div
            className={[s.learnedWordIcon, s.cardIcon].join(' ')}
            onClick={async () => {
              await markWord(CONSTANTS.wordStatus.learned);
              setHighlightLearnedWord(true);
            }}
          />
        ) : null}
        {rootStore.authStore.isAuth && Number(localStorage.getItem('textbookGroup')) !== 6 ? (
          <div
            className={[s.complicatedWordIcon, s.cardIcon].join(' ')}
            onClick={async () => {
              setHighlightHardWord(true);
              await markWord(CONSTANTS.wordStatus.hard);
            }}
          />
        ) : rootStore.authStore.isAuth ? (
          <div
            className={[s.deleteWordIcon, s.cardIcon].join(' ')}
            onClick={async () => {
              await textbookAPI.removeHardWord(card._id);
              setHideWord(true);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default observer(TextbookCard);
