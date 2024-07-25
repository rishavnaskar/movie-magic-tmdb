import {CommonStateType, MovieStateType, MovieType} from '../../types';

const getInitialData = () =>
  ({
    data: {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: [],
      resultsMap: new Map<number, MovieType>(),
    },
    loading: false,
    error: null,
  } as MovieStateType);

export const initialState: CommonStateType = {
  nowPlayingMovies: getInitialData(),
  popularMovies: getInitialData(),
  topRatedMovies: getInitialData(),
  upcomingMovies: getInitialData(),
  searchedMovies: getInitialData(),
};
