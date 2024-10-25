import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import noticeSlice from '../slices/noticeSlice';
import memberSlice from '../slices/memberSlice';
import labelTableSlice from '../slices/labelTableSlice';
import mypageSlice from '../slices/mypageSlice';
import labelTaskSlice from '../slices/labelTaskSlice';

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

const reducers = combineReducers({
    userSlice,
    noticeSlice,
    memberSlice,
    labelTableSlice,
    mypageSlice,
    labelTaskSlice
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