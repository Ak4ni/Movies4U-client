import { combineReducers } from "redux";

import { SET_FILTERS, SET_MOVIES } from "../actions/action";

function visibilityFilter(state='', action){
    switch(action.type) {
        case SET_FILTERS:
            return action.value;
            default:
                return state;
    }
}

function movies(state  = [], action) {
    switch (action.type){
        case SET_MOVIES:
            return action.value;
            default:
                return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;