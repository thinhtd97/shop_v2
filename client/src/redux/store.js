import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import createMiddlewareSaga from 'redux-saga';
import rootSaga from './saga';

const middlewareSaga = createMiddlewareSaga();
const middleware = [middlewareSaga]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
middlewareSaga.run(rootSaga);

export default store;