import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import search from './search';

const reducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing,
  search
});

export default reducer;