import * as types from '../constants/ActionTypes';

const initialState = {
  id: '',
  title: '',
  status: false
};

const taskEditing = (state = initialState, action) => {
  switch(action.type) {
    case types.EDIT_TASK:
      return {...action.task};
    default: return state;
  }
}

export default taskEditing;