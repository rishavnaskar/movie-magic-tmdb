import {put} from 'redux-saga/effects';
import {
  GetMovieDataActionType,
  SetMovieFailureActionType,
  SetMovieLoadingActionType,
  SetMovieSuccessActionType,
} from '../../types/actionTypes';
import {
  MovieErrorResponseType,
  MovieListResponseType,
} from '../../types/responseTypes';
import {
  nowPlayingMovieActions,
  popularMovieActions,
  topRatedMovieActions,
  upcomingMovieActions,
} from '../action';
import {getMovieDataApi} from '../../api';

function* getDataHelper(endPoint: string, page: number) {
  try {
    const response: Response = yield getMovieDataApi(endPoint, page);
    if (response.ok) {
      const jsonResponse: MovieListResponseType = yield response.json();
      return jsonResponse;
    } else {
      const jsonResponse: MovieErrorResponseType = yield response.json();
      throw new Error(jsonResponse.status_message ?? 'Failed to fetch data');
    }
  } catch (error) {
    throw error;
  }
}

const getError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(error?.message ?? 'Something went wrong!');
};

function* apiHelper({
  endPoint,
  page,
  setDataFailure,
  setDataLoading,
  setDataSuccess,
  setPaginatedDataSuccess,
}: {
  endPoint: string;
  page: number;
  setDataLoading: (val: boolean) => SetMovieLoadingActionType;
  setDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setPaginatedDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setDataFailure: (response: Error) => SetMovieFailureActionType;
}) {
  try {
    yield put(setDataLoading(true));
    const response = yield* getDataHelper(endPoint, page);
    if (page > 1) {
      yield put(setPaginatedDataSuccess(response));
    } else {
      yield put(setDataSuccess(response));
    }
  } catch (error) {
    yield put(setDataFailure(getError(error)));
  }
}

export function* getNowPlayingMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    endPoint: 'now_playing',
    page: action.payload.page,
    setDataLoading: nowPlayingMovieActions.setDataLoading,
    setDataSuccess: nowPlayingMovieActions.setDataSuccess,
    setPaginatedDataSuccess: nowPlayingMovieActions.setPaginatedDataSuccess,
    setDataFailure: nowPlayingMovieActions.setDataFailure,
  });
}

export function* getPopularMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    endPoint: 'popular',
    page: action.payload.page,
    setDataLoading: popularMovieActions.setDataLoading,
    setDataSuccess: popularMovieActions.setDataSuccess,
    setPaginatedDataSuccess: popularMovieActions.setPaginatedDataSuccess,
    setDataFailure: popularMovieActions.setDataFailure,
  });
}

export function* getTopRatedMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    endPoint: 'top_rated',
    page: action.payload.page,
    setDataLoading: topRatedMovieActions.setDataLoading,
    setDataSuccess: topRatedMovieActions.setDataSuccess,
    setPaginatedDataSuccess: topRatedMovieActions.setPaginatedDataSuccess,
    setDataFailure: topRatedMovieActions.setDataFailure,
  });
}

export function* getUpcomingMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    endPoint: 'upcoming',
    page: action.payload.page,
    setDataLoading: upcomingMovieActions.setDataLoading,
    setDataSuccess: upcomingMovieActions.setDataSuccess,
    setPaginatedDataSuccess: upcomingMovieActions.setPaginatedDataSuccess,
    setDataFailure: upcomingMovieActions.setDataFailure,
  });
}

export function* getSearchMovieData(action: GetMovieDataActionType) {
  //   try {
  //     yield put(searchMovieActions.setDataLoading(true));
  //     const response = yield* getDataHelper('now_playing', action.payload.page);
  //     yield put(searchMovieActions.setDataSuccess(response));
  //   } catch (error) {
  //     yield put(searchMovieActions.setDataFailure(getError(error)));
  //   }
}
