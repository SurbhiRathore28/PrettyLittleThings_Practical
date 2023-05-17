import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware()
const middleWare = [sagaMiddleWare]

export const store = createStore(
    reducer,
    applyMiddleware(...middleWare)
)

sagaMiddleWare.run(rootSaga)