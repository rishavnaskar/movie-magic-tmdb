import {
  GetMovieDataActionType,
  ResetDataActionType,
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

export type MovieActionType = {
  getData: (page: number, query?: string) => GetMovieDataActionType;
  setDataLoading: (val: boolean) => SetMovieLoadingActionType;
  setDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setPaginatedDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setDataFailure: (response: Error) => SetMovieFailureActionType;
  resetData: () => ResetDataActionType;
};

const getDataHelper = (type: string, page: number): GetMovieDataActionType => ({
  type: type,
  payload: {page},
});

const searchDataHelper = (
  type: string,
  page: number,
  query?: string,
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

const resetDataHelper = (type: string): ResetDataActionType => ({
  type,
  payload: null,
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
  resetData: () => resetDataHelper(NOW_PLAYING_MOVIE_ACTIONS_TYPES.RESET_DATA),
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
  resetData: () => resetDataHelper(POPULAR_MOVIE_ACTIONS_TYPES.RESET_DATA),
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
  resetData: () => resetDataHelper(TOP_RATED_MOVIE_ACTIONS_TYPES.RESET_DATA),
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
  resetData: () => resetDataHelper(UPCOMING_MOVIE_ACTIONS_TYPES.RESET_DATA),
};

export const searchMovieActions: MovieActionType = {
  getData: (page, query) =>
    searchDataHelper(SEARCH_MOVIE_ACTIONS_TYPES.GET_DATA, page, query),
  setDataLoading: val =>
    setDataLoadingHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_LOADING, val),
  setDataSuccess: response =>
    setDataSuccessHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_SUCCESS, response),
  setPaginatedDataSuccess: response =>
    setDataSuccessHelper(
      SEARCH_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS,
      response,
    ),
  setDataFailure: response =>
    setDataFailureHelper(SEARCH_MOVIE_ACTIONS_TYPES.SET_FAILURE, response),
  resetData: () => resetDataHelper(SEARCH_MOVIE_ACTIONS_TYPES.RESET_DATA),
};
