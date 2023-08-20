import { LOAD_MOVIES } from "./actionTypes";



export const loadMoviesAction = (page: number) => ({
  type: LOAD_MOVIES,
  payload: page,
});


