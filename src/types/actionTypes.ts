import {MovieListResponseType} from './responseTypes';

export type GetMovieDataActionType = {
  type: string;
  payload: {page: number};
};

export type SearchMovieDataActionType = {
  type: string;
  payload: {query: string; page: number};
};

export type SetMovieLoadingActionType = {
  type: string;
  payload: boolean;
};

export type SetMovieSuccessActionType = {
  type: string;
  payload: MovieListResponseType;
};

export type SetMovieFailureActionType = {
  type: string;
  payload: Error;
};
