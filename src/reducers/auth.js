import {Book_Mechanic, Set_CurrentUser} from '../actions/Types';
import isEmpty from 'lodash/isEmpty';
const initialState = {
  isAuthenticated: false,
  user: {},
  
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Set_CurrentUser:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
  
    default:
      return state;
  }
};
