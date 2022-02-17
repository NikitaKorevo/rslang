import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import s from './Textbook.module.scss';
import { getWords } from '../../API/textbook';
import CONSTANTS from '../../constants/constants';
import TextbookCard from '../../components/Textbook/TextbookCard/TextbookCard';
import PaginationBar from '../../components/Pagination/PaginationBar';
import SettingsBar from '../../components/Textbook/SettingsBar/SettingsBar';
import { Context } from '../../index';

const Textbook = () => {
  const { rootStore } = useContext(Context);

  const [words, updateWords] = useState([]);
  const [loadAnimation, setLoadAnimation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await loadWords();
    };
    fetchData();
  }, []);

  const loadWords = async () => {
    try {
      setLoadAnimation(true);
      const data = await getWords(
        rootStore.textbookStore.textbookGroup,
        rootStore.textbookStore.currentTextbookPage
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
            <h4>TextBook</h4>
            <SettingsBar loadWords={loadWords} />
            <PaginationBar loadWords={loadWords} />
            <div className={s.cards}>
              {words.map((card, pos) => (
                <TextbookCard
                  card={card}
                  pos={pos}
                  playAudio={playAudioHandler}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              ))}
            </div>
            <PaginationBar loadWords={loadWords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Textbook;
