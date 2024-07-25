const getCommonActionTypes = (key: string = '') => ({
  GET_DATA: 'GetData' + key,
  SET_LOADING: 'SetLoading' + key,
  SET_SUCCESS: 'SetSuccess' + key,
  SET_PAGINATED_SUCCESS: 'SetPaginatedSuccess' + key,
  SET_FAILURE: 'SetFailure' + key,
});

export const NOW_PLAYING_MOVIE_ACTIONS_TYPES =
  getCommonActionTypes('NowPlayingMovies');

export const POPULAR_MOVIE_ACTIONS_TYPES =
  getCommonActionTypes('PopuplarMovies');

export const TOP_RATED_MOVIE_ACTIONS_TYPES =
  getCommonActionTypes('TopRatedMovies');

export const UPCOMING_MOVIE_ACTIONS_TYPES =
  getCommonActionTypes('UpcomingMovies');

export const SEARCH_MOVIE_ACTIONS_TYPES = getCommonActionTypes('SearchMovies');