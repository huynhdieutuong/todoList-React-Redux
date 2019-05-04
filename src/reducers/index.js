import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';

const reducer = combineReducers({
  tasks,
  isDisplayForm
});

export default reducer;