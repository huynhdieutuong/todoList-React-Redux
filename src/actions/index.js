import * as types from '../constants/ActionTypes';

export const listAll = () => {
  return {
    type: types.LIST_ALL
  }
};

export const saveTask = task => {
  return {
    type: types.SAVE_TASK,
    task
  }
}

export const toogleForm = () => {
  return {
    type: types.TOOGLE_FORM
  }
}

export const openForm = () => {
  return {
    type: types.OPEN_FORM
  }
}

export const closeForm = () => {
  return {
    type: types.CLOSE_FORM
  }
}

export const changeStatus = id => {
  return {
    type: types.CHANGE_STATUS,
    id
  }
}

export const deleteTask = id => {
  return {
    type: types.DELETE_TASK,
    id
  }
}

export const editTask = task => {
  return {
    type: types.EDIT_TASK,
    task
  }
}

export const searchTask = search => {
  return {
    type: types.SEARCH_TASK,
    search
  }
}

export const sortTask = value => {
  return {
    type: types.SORT_TASK,
    value
  }
}