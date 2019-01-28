import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true
});

const reducer = combineReducers({
    form,
});

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;