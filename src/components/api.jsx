import axios from 'axios';

const newsApi = axios.create({
  baseURL: `https://news-api-so0z.onrender.com/api`
});

export default newsApi

