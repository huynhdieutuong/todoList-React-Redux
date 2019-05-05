import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';

const reducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing
});

export default reducer;