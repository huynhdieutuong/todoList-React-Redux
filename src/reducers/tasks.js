import * as types from '../constants/ActionTypes';
import uuid from 'uuid/v4';

const data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

const tasks = (state = initialState, action) => {
  switch(action.type) {
    case types.LIST_ALL: 
      return state;
    case types.ADD_TASK:
      state.push({ 
        ...action.task, 
        id: uuid()
      });
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    default: return state;
  }
}

export default tasks;