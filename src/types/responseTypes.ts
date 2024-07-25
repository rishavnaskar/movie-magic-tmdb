export type MovieResponseType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type DatesType = {
  maximum: string;
  minimum: string;
};

export type MovieListResponseType = {
  dates: DatesType;
  page: number;
  results: MovieResponseType[];
  total_pages: number;
  total_results: number;
};

export type MovieErrorResponseType = {
  status_code: number;
  status_message: string;
  success: boolean;
};
