import TMDB_ACCESS_TOKEN from '../config';
import {BASE_URLS} from './constants';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export const getMovieDataApi = async (endPoint: string, page: number) => {
  const url = `${BASE_URLS.MOVIE_LIST}/${endPoint}?language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};

export const searchMovieApi = async (query: string, page: number) => {
  const url = `${BASE_URLS.SEARCH_MOVIES}?query=${query}&language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};
