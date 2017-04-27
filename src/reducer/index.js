import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import selectedUserReducer from './selectedUserReducer';
import groupReducer from './groupReducer';
import apiReducer from './apiReducer';

export default combineReducers({
  usersReducer,
  selectedUserReducer,
  groupReducer,
  apiReducer,
  form: formReducer
});


