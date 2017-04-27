import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const selectedUserReducer = (state = initialState.selectedUserReducer, action) => {
  switch (action.type) {

    case ActionType.GET_USER_RESPONSE: {
      return {
        ...state,
        user: _.assign(action.user)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedUserReducer;
