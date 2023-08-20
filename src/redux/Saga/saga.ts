import { call, put, takeEvery } from 'redux-saga/effects';
import axios, { all } from 'axios';
import { LOAD_MOVIES, SET_LOADING, SET_MOVIES } from '../Action/actionTypes';


function* loadMoviesSaga(action: any): Generator<any, void, any> {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const page = action.payload;

    const response = yield call(
      axios.get,
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    const moviePromises = response.data.results.map((movie: any) =>
      call(
        axios.get,
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
    );

    const movieDetailsResponses = yield all(moviePromises);

    const movieDetails = movieDetailsResponses.map(
      (detail: any) => detail.data
    );

    yield put({ type: SET_MOVIES, payload: movieDetails });
    yield put({ type: SET_LOADING, payload: false });
  } catch (error) {
  
  }
}

function* rootSaga() {
  yield takeEvery(LOAD_MOVIES, loadMoviesSaga);

}

export default rootSaga;
