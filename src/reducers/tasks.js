import * as types from '../constants/ActionTypes';
import uuid from 'uuid/v4';

const data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

const tasks = (state = initialState, action) => {
  let index = -1;
  switch(action.type) {
    case types.LIST_ALL: 
      return state;
    // add new task & edit task
    case types.SAVE_TASK:
      if(action.task.id) {
        index = state.findIndex(task => task.id === action.task.id);
        state[index] = action.task;
      } else {
        state.push({ 
          ...action.task, 
          id: uuid()
        });
      }
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    // change status
    case types.CHANGE_STATUS:
      index = state.findIndex(task => task.id === action.id);
      state[index] = {
        ...state[index],
        status: !state[index].status
      };
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    // delete task
    case types.DELETE_TASK:
      index = state.findIndex(task => task.id === action.id);
      state.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];

    default: 
      return state;
  }
}

export default tasks;