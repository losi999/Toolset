import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const logger = createLogger({
    collapsed: true,
});

const reducer = combineReducers({
    form,
    user: userReducer,
});

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
