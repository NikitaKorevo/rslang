import $api from './http';
import CONSTANTS from '../constants/constants';

export const getWords = async (group, page) => {
  return $api.get(`${CONSTANTS.endPoint.words}?group=${group}&page=${page}`);
};

export const createHardWord = async ({ userId, wordId, word, token }) => {
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
