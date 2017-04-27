import * as ActionType from '../action/ActionType';
import initialState from './initialState';

const groupReducer = (state = initialState.groupReducer, action) => {
  switch (action.type) {
    case ActionType.GET_GROUPS_RESPONSE:
      return {...state, groups: Object.assign([], action.groups)};

    default:
      return state;
  }
};


export default groupReducer;
