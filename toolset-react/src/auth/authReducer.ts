import { AuthAction } from 'src/auth/authActions';

export type AuthState = {
  token: string;
  error: string;
};

const initialState: AuthState = {
  token: '',
  error: '',
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_FAILED':
      break;
    case 'REGISTRATION_SUCCEEDED':
      return {
        ...state,
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

export default authReducer;
