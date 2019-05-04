import * as types from '../constants/ActionTypes';
import uuid from 'uuid/v4';

const data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

const tasks = (state = initialState, action) => {
  switch(action.type) {
    case types.LIST_ALL: 
      return state;
    // add new task
    case types.ADD_TASK:
      state.push({ 
        ...action.task, 
        id: uuid()
      });
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    // change status
    case types.CHANGE_STATUS:
      const index = state.findIndex(task => task.id === action.id);
      state[index] = {
        ...state[index],
        status: !state[index].status
      };
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];

    default: 
      return state;
  }
}

export default tasks;