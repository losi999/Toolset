import { UserAction } from '../actions/userActions';

export interface UserState {
  token: string;
  error: string;
}

const initialState: UserState = {
  token: '',
  error: ''
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_FAILED':
      break;
    case 'REGISTRATION_SUCCEEDED':
      return {
        ...state
      };
    case 'REGISTRATION_FAILED':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'LOGIN_SUCCEEDED':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload.error,
      };
  }

  return state;
};

export default userReducer;
