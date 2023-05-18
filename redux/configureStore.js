import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from './storage'
import userReducer from './Slices/userSlice'
import jobReducer from './Slices/jobSlice'
import placementPolicyReducer from './Slices/placementPolicy'
import collegeProfileReducer from './Slices/profile'
import rootSaga from './Sagas/rootSaga'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  placementPolicy: placementPolicyReducer,
  profile: collegeProfileReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

// Custom middleware to handle non-serializable values
const nonSerializableValueMiddleware = getDefaultMiddleware({
  serializableCheck: false
}).concat((store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production' && action.type !== 'persist/PERSIST' && action.type !== 'persist/REHYDRATE') {
    const nonSerializableActionTypes = ['persist/PERSIST', 'persist/REHYDRATE']
    if (nonSerializableActionTypes.includes(action.type)) {
      console.warn(`A non-serializable value was dispatched with action type: ${action.type}`)
    }
  }
  return next(action)
})

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, ...nonSerializableValueMiddleware]
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { store, persistor }
