import * as types from '../constants/ActionTypes';

const initialState = '';

const search = (state = initialState, action) => {
  switch(action.type) {
    case types.SEARCH_TASK:
      console.log(action.search);
      state = action.search;
      return state;
    default:
      return state;
  }
}

export default search;