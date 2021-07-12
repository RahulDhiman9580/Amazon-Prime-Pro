import {persistReducer,persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import storage from "redux-persist/lib/storage"
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

//custom imports
import reducer from '../reducer/reducer'

const enhancer = compose(
    applyMiddleware(
        thunk,
        createLogger({
            predicate : () => __DEV__,
        }),
    ),
);

const persistConfig = {
    key : 'root',
    storage : AsyncStorage,
    whitelist : ['authReducer', 'movieReducer'],
    blacklist : []
}

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer,enhancer);
export const persistor = persistStore(store);