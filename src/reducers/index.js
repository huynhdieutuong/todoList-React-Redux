import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import search from './search';
import sort from './sort';

const reducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing,
  search,
  sort
});

export default reducer;