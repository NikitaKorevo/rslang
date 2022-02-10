import $api from './http.js';
import { CONSTANTS } from '../constants/constants.js';

export const getWords = async (group, page) => {
  return $api.get(`${CONSTANTS.endPoint.words}?group=${group}&page=${page}`);
};
