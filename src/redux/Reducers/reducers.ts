import { IMovie } from '@/interface/movie';
import { combineReducers } from 'redux';
import { SET_LOADING, SET_MOVIES, SET_MOVIE_DETAILS, SET_SEARCH_QUERY } from '../Action/actionTypes';

interface AppState {
  movies: IMovie[];
  isLoadingMore: boolean;
  searchQuery: string;
  movieDetails: IMovie | null;
}

const initialState: AppState = {
  movies: [],
  isLoadingMore: false,
  searchQuery: '',
  movieDetails: null,
};

const moviesReducer = (state = initialState.movies, action: any) => {
  switch (action.type) {
    case SET_MOVIES:
      return action.payload;
    default:
      return state;
  }
};

const isLoadingReducer = (state = initialState.isLoadingMore, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

const searchQueryReducer = (state = initialState.searchQuery, action: any) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.payload;
    default:
      return state;
  }
};

const movieDetailsReducer = (state = initialState.movieDetails, action: any) => {
  switch (action.type) {
    case SET_MOVIE_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  isLoadingMore: isLoadingReducer,
  searchQuery: searchQueryReducer,
  movieDetails: movieDetailsReducer,
});

export default rootReducer;
