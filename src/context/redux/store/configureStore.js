import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { logReducer } from '../reducers/logReducer';
import { APPCONFIG } from '../../../app.config';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: APPCONFIG.GENERAL.REDUX_KEY,
    storage,
}

const reducers = combineReducers({
    auth: authReducer,
    log: logReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    let persistor = persistStore(store);
    
    return { store, persistor };
}
