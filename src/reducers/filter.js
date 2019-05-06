import * as types from '../constants/ActionTypes';

const initialState = {
  filterTitle: '',
  filterStatus: 0
};

const filter = (state = initialState, action) => {
  switch(action.type) {
    case types.FILTER_TABLE:
      const { filterStatus } = action.filterValue;
      state = {
        ...action.filterValue,
        filterStatus: filterStatus === '1' ? true : filterStatus === '-1' ? false : 0
      }
      return {...state};
    default:
      return state;
  }
}

export default filter;