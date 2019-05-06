import * as types from '../constants/ActionTypes';

const initialState = '';

const sort = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT_TASK:
      return action.value;
    default:
      return state;
  }
};

export default sort;