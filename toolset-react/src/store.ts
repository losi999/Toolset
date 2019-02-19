import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer, { AuthState } from 'src/reducers/authReducer';

export type Store = {
    auth: AuthState,
};

const logger = createLogger({
    collapsed: true,
});

const reducer = combineReducers({
    form,
    auth: authReducer,
});

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
