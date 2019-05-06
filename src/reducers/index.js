import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filterValue from './filter';

const reducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing,
  filterValue
});

export default reducer;