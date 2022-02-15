import { CONSTANTS } from '../constants/constants.js';
import axios from 'axios';

const $api = axios.create({
  baseURL: CONSTANTS.baseUrl
});

export default $api;
