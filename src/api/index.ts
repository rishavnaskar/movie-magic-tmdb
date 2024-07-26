import TMDB_ACCESS_TOKEN from '../config';
import {BASE_URLS} from './base_urls';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

const getPostOptions = (body: Object) => ({
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
  body: JSON.stringify(body),
});

export const authenticationUserApi = async () => {
  return await fetch(BASE_URLS.AUTHENTICATE_USER, options);
};

export const createRequestTokenApi = async () => {
  return await fetch(BASE_URLS.CREATE_REQUEST_TOKEN, options);
};

export const createSessionIdApi = async (requestToken: string) => {
  return await fetch(
    BASE_URLS.CREATE_SESSION_ID,
    getPostOptions({request_token: requestToken}),
  );
};

export const getUserDetailsApi = async (sessionId: string) => {
  const url = `${BASE_URLS.GET_ACCOUNT_DETAILS}?session_id=${sessionId}`;
  return await fetch(url, options);
};

export const getMovieDataApi = async (endPoint: string, page: number) => {
  const url = `${BASE_URLS.MOVIE_LIST}/${endPoint}?language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};

export const searchMovieApi = async (query: string, page: number) => {
  const url = `${BASE_URLS.SEARCH_MOVIES}?query=${query}&language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};
