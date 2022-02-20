import $api from './http';
import CONSTANTS from '../constants/constants';

export const getWords = async (group, page) => {
  return $api.get(`${CONSTANTS.endPoint.words}?group=${group}&page=${page}`);
};

export const createUserWord = async ({ userId, wordId, word, token }) => {
  try {
    return fetch(`${CONSTANTS.baseUrl}${CONSTANTS.endPoint.users}/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserHardWords = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo.token;
  const userId = userInfo.userId;
  return $api.get(
    `${CONSTANTS.endPoint.users}/${userId}/aggregatedWords?filter=%7B%22userWord.optional.status%22%3A%22hard%22%7D`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }
  );
};

export const getUserWords = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo.token;
  const userId = userInfo.userId;
  return $api.get(
    `${CONSTANTS.endPoint.users}/${userId}/aggregatedWords?wordsPerPage=250&filter=%7B%22%24or%22%3A%5B%7B%22userWord.optional.status%22%3A%22hard%22%7D%2C%7B%20%22userWord.optional.status%22%3A%22learned%22%7D%5D%7D`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }
  );
};

export const removeHardWord = async (wordId) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo.token;
  const userId = userInfo.userId;
  return $api.delete(
    `${CONSTANTS.endPoint.users}/${userId}/${CONSTANTS.endPoint.words}/${wordId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }
  );
};
