export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTERS = 'SET_FILTERS';

export function setMovies(value) {
    return{ type: SET_MOVIES, value };
} 

export function setFilter(value) {
    return {type: SET_FILTERS, value };
}

