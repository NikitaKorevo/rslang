import $api from './http';
import CONSTANTS from '../constants/constants';

export const getWords = async (group, page) => {
  return $api.get(`${CONSTANTS.endPoint.words}?group=${group}&page=${page}`);
};
