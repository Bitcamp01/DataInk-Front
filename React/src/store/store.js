import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

import storageSession from 'redux-persist/es/storage/session';
import mypageSlice from '../slices/mypageSlice';

const reducers = combineReducers({
    userSlice,
    mypageSlice
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
            }
        })
});