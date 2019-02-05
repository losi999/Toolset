import { UserAction } from '../actions/userActions';

export interface UserState {
  token?: string;
  result?: string;
  error?: any;
}

const userReducer = (state: UserState = {}, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_FAILED':
      break;
    case 'REGISTRATION_SUCCEEDED':
      return {
        ...state,
        result: action.payload,
      };
    case 'REGISTRATION_FAILED':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGIN_SUCCEEDED':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload,
      };
  }

  return state;
};

export default userReducer;
