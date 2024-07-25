import {
  GetMovieDataActionType,
  SearchMovieDataActionType,
  SetMovieFailureActionType,
  SetMovieLoadingActionType,
  SetMovieSuccessActionType,
} from '../../types/actionTypes';
import {MovieListResponseType} from '../../types/responseTypes';
import {
  NOW_PLAYING_MOVIE_ACTIONS_TYPES,
  POPULAR_MOVIE_ACTIONS_TYPES,
  SEARCH_MOVIE_ACTIONS_TYPES,
  TOP_RATED_MOVIE_ACTIONS_TYPES,
  UPCOMING_MOVIE_ACTIONS_TYPES,
} from './constants';

type MovieActionType = {
  getData: (page: number) => GetMovieDataActionType;
  setDataLoading: (val: boolean) => SetMovieLoadingActionType;
  setDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setPaginatedDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setDataFailure: (response: Error) => SetMovieFailureActionType;
};

const getDataHelper = (type: string, page: number): GetMovieDataActionType => ({
  type: type,
  payload: {page},
});

const searchDataHelper = (
  type: string,
  query: string,
  page: number,
): SearchMovieDataActionType => ({type, payload: {query, page}});

const setDataLoadingHelper = (
  type: string,
  val: boolean,
): SetMovieLoadingActionType => ({type, payload: val});

const setDataSuccessHelper = (
  type: string,
  response: MovieListResponseType,
): SetMovieSuccessActionType => ({type, payload: response});

const setDataFailureHelper = (
  type: string,
  error: Error,
): SetMovieFailureActionType => ({
  type,
  payload: error,
});

export const nowPlayingMovieActions: MovieActionType = {
  getData: page =>
    getDataHelper(NOW_PLAYING_MOVIE_ACTIONS_TYPES.GET_DATA, page),
  setDataLoading: val =>
    setDataLoadingHelper(NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: response =>
    setDataSuccessHelper(NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setPaginatedDataSuccess: response =>
    setDataSuccessHelper(
      NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS,
      response,
    ),
  setDataFailure: response =>
    setDataFailureHelper(NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
};

export const popularMovieActions: MovieActionType = {
  getData: page => getDataHelper(POPULAR_MOVIE_ACTIONS_TYPES.GET_DATA, page),
  setDataLoading: val =>
    setDataLoadingHelper(POPULAR_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: response =>
    setDataSuccessHelper(POPULAR_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setPaginatedDataSuccess: response =>
    setDataSuccessHelper(
      POPULAR_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS,
      response,
    ),
  setDataFailure: response =>
    setDataFailureHelper(POPULAR_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
};

export const topRatedMovieActions: MovieActionType = {
  getData: page => getDataHelper(TOP_RATED_MOVIE_ACTIONS_TYPES.GET_DATA, page),
  setDataLoading: val =>
    setDataLoadingHelper(TOP_RATED_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: response =>
    setDataSuccessHelper(TOP_RATED_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setPaginatedDataSuccess: response =>
    setDataSuccessHelper(
      TOP_RATED_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS,
      response,
    ),
  setDataFailure: response =>
    setDataFailureHelper(TOP_RATED_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
};

export const upcomingMovieActions: MovieActionType = {
  getData: page => getDataHelper(UPCOMING_MOVIE_ACTIONS_TYPES.GET_DATA, page),
  setDataLoading: val =>
    setDataLoadingHelper(UPCOMING_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: response =>
    setDataSuccessHelper(UPCOMING_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setPaginatedDataSuccess: response =>
    setDataSuccessHelper(
      UPCOMING_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS,
      response,
    ),
  setDataFailure: response =>
    setDataFailureHelper(UPCOMING_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
};

export const searchMovieActions = {
  getData: (query: string, page: number) =>
    searchDataHelper(SEARCH_MOVIE_ACTIONS_TYPES.GET_DATA, query, page),
  setDataLoading: (val: boolean) =>
    setDataLoadingHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: (response: MovieListResponseType) =>
    setDataSuccessHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setDataFailure: (response: Error) =>
    setDataFailureHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
};
