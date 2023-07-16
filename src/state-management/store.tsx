import {configureStore, ThunkDispatch, AnyAction} from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk'; //??

import counterReducer from './counterSlice'
import basketReducer from './basketSlice'
import productReducer from './productSlice'

const reducers = combineReducers({
  counter: counterReducer,
  basket:basketReducer,
  catalog:productReducer
});

const persistConfig = {
    key: 'devtube',
    storage,
    whitelist:['counter', 'basket'],
    //blacklist:['counter'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, null, AnyAction>;

export default store;