import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://minekvanszezonja.firebaseio.com/',
});

export default instance;
