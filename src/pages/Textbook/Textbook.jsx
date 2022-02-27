import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import s from './Textbook.module.scss';
import { getUserWords, getWords } from '../../API/textbookAPI';
import CONSTANTS from '../../constants/constants';
import TextbookCard from '../../components/Textbook/TextbookCard/TextbookCard';
import PaginationBar from '../../components/Textbook/Pagination/PaginationBar';
import SettingsBar from '../../components/Textbook/SettingsBar/SettingsBar';
import { Context } from '../../index';

const Textbook = () => {
  const [words, updateWords] = useState([]);
  const [loadAnimation, setLoadAnimation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hardWordsId, setHardWordsId] = useState([]);
  const [learnedWordsId, setLearnedWordsId] = useState([]);

  const { rootStore } = useContext(Context);

  const setUserWordsList = async () => {
    try {
      const data = await getUserWords();

      const hardWords = data.data[0].paginatedResults.filter(
        (el) => el.userWord.optional.status === 'hard'
      );
      const learnedWords = data.data[0].paginatedResults.filter(
        (el) => el.userWord.optional.status === 'learned'
      );

      const hardWordsIdList = hardWords.map((el) => el._id);
      const learnedWordsIdList = learnedWords.map((el) => el._id);

      setHardWordsId(hardWordsIdList);
      setLearnedWordsId(learnedWordsIdList);
    } catch (e) {
      await rootStore.authStore.updateTokens();
    }
  };

  const loadWords = async () => {
    try {
      setLoadAnimation(true);

      const data = await getWords(
        Number(localStorage.getItem('textbookGroup')),
        Number(localStorage.getItem('currentPage'))
      );
      updateWords(data.data);
      setLoadAnimation(false);
    } catch (e) {
      setLoadAnimation(false);
    }
  };

  const loadHardWords = async () => {
    try {
      setLoadAnimation(true);
      const data = await getUserWords();
      const hardWords = data.data[0].paginatedResults.filter(
        (el) => el.userWord.optional.status === 'hard'
      );
      updateWords(hardWords);
      setHardWordsId(hardWords);
      setLoadAnimation(false);
    } catch (e) {
      setLoadAnimation(false);
    }
  };

  const playAudioHandler = async (...args) => {
    if (args.length === 0) {
      setIsPlaying(false);
      return;
    }
    const audioEndPoints = args;
    const audioPath = `${CONSTANTS.baseUrl}${audioEndPoints[0]}`;
    const audio = new Audio(audioPath);
    await audio.play();
    audio.onended = () => {
      audioEndPoints.shift();
      playAudioHandler(...audioEndPoints);
    };
  };

  useEffect(async () => {
    if (!localStorage.getItem('currentPage')) {
      localStorage.setItem('currentPage', '0');
      localStorage.setItem('textbookShowTranslation', 'true');
      localStorage.setItem('textbookGroup', '0');
    }

    const page = Number(localStorage.getItem('currentPage'));
    const group = Number(localStorage.getItem('textbookGroup'));

    rootStore.textbookStore.setTextbookGroup(group);
    rootStore.textbookStore.setTextbookPage(page);

    await setUserWordsList();

    Number(localStorage.getItem('textbookGroup')) === 6 ? await loadHardWords() : await loadWords();
  }, []);

  return (
    <div className={s.textbook}>
      {loadAnimation ? (
        <div className={s.loadingIcon}>
          <Spinner animation="grow" role="status" className={s.spinner}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <SettingsBar
            loadWords={loadWords}
            loadHardWords={loadHardWords}
            setUserWordsList={setUserWordsList}
          />
          <PaginationBar loadWords={loadWords} setUserWordsList={setUserWordsList} />
          <div className={s.cards}>
            {words.length === 0 ? (
              <div>Сложных слов не обнаружено...</div>
            ) : (
              words.map((card) => (
                <TextbookCard
                  key={card.id}
                  card={card}
                  playAudio={playAudioHandler}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  hardWordsId={hardWordsId}
                  learnedWordsId={learnedWordsId}
                  setUserWordsList={setUserWordsList}
                  loadHardWords={loadHardWords}
                />
              ))
            )}
          </div>
          <PaginationBar loadWords={loadWords} />
        </div>
      )}
    </div>
  );
};

export default Textbook;
