import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userSlice from '../slices/userSlice';
import noticeSlice from '../slices/noticeSlice';
import memberSlice from '../slices/memberSlice';
import labelTableSlice from '../slices/labelTableSlice';
import mypageSlice from '../slices/mypageSlice';
import labelTaskSlice from '../slices/labelTaskSlice';
import calendarSlice from '../slices/calendarSlice';
import eventSlice from '../slices/eventSlice';
import searchSlice from '../slices/searchSlice';
import memberModalSlice from '../slices/memberModalSlice';

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
    labelTaskSlice,
    mypageSlice,
    calendarSlice,
    eventSlice,
    searchSlice,
    memberModalSlice,
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