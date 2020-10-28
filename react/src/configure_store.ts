import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tft from './reducers/tft';

const isDevVersion:boolean = process.env.NODE_ENV === 'development';
const composeEnhancers:Function = (window as { [key: string]: any })['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const middlewares:any[] = [ReduxThunk];

const volatileReducers:any[] = [];

interface Config{
    key:string,
    storage:any,
    debug:boolean,
    blacklist:any[]
}

const config:Config = {
    key: 'root',
    storage,
    debug: isDevVersion,
    blacklist: volatileReducers,
};

const reducers:any = persistCombineReducers(config, {
    tft,
});

export const configureStore = () => {
    const store:any = createStore(
        reducers,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    const persistor:any = persistStore(store);

    // persistor.purge();
    return { persistor, store };
};
