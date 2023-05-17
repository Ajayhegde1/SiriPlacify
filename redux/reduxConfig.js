import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'

// Add persister
import { persistStore, persistReducer } from 'redux-persist'

import { watcherSaga } from './sagas/rootSaga'
import userReducer from './ducks/userDuck'

// Combining all the reducers
const reducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

/* Middlewares */
const sagaMiddleware = createSagaMiddleware()

// All the middlewares
const middlewares = [sagaMiddleware]

// Creating the redux store
// the second parameter is an enhancer. Since we dont have any thus {}
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

// Starting the Watcher Saga to listen redux actions
sagaMiddleware.run(watcherSaga)

export const persister = persistStore(store)
export default store