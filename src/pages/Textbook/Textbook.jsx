import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import s from './Textbook.module.scss';
import { getUserHardWords, getWords } from '../../API/textbookAPI';
import CONSTANTS from '../../constants/constants';
import TextbookCard from '../../components/Textbook/TextbookCard/TextbookCard';
import PaginationBar from '../../components/Textbook/Pagination/PaginationBar';
import SettingsBar from '../../components/Textbook/SettingsBar/SettingsBar';

const Textbook = () => {
  const [words, updateWords] = useState([]);
  const [loadAnimation, setLoadAnimation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(async () => {
    if (!localStorage.getItem('currentPage')) {
      localStorage.setItem('currentPage', '0');
      localStorage.setItem('textbookShowTranslation', 'true');
      localStorage.setItem('textbookGroup', '0');
    }

    await loadUserHardWords();

    Number(localStorage.getItem('textbookGroup')) === 6
      ? await loadUserHardWords()
      : await loadWords();
  }, []);

  const loadUserHardWords = async () => {
    try {
      setLoadAnimation(true);
      const data = await getUserHardWords();
      console.log(data.data[0].paginatedResults);
      const hardWords = data.data[0].paginatedResults;
      updateWords(hardWords);
      setLoadAnimation(false);
    } catch (e) {
      setLoadAnimation(false);
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
      console.log(data.data);
    } catch (e) {
      setLoadAnimation(false);
    }
  };

  const playAudioHandler = (...args) => {
    if (args.length === 0) {
      setIsPlaying(false);
      return;
    }
    const audioEndPoints = args;
    const audioPath = `${CONSTANTS.baseUrl}${audioEndPoints[0]}`;
    const audio = new Audio(audioPath);
    audio.play();
    audio.onended = () => {
      audioEndPoints.shift();
      playAudioHandler(...audioEndPoints);
    };
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
            <SettingsBar loadWords={loadWords} loadHardWords={loadUserHardWords} />
            <PaginationBar loadWords={loadWords} />
            <div className={s.cards}>
              {words.length === 0 ? (
                <div>Сложных слов не обнаружено...</div>
              ) : (
                words.map((card, pos) => (
                  <TextbookCard
                    card={card}
                    pos={pos}
                    playAudio={playAudioHandler}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                ))
              )}
            </div>
            <PaginationBar loadWords={loadWords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Textbook;
