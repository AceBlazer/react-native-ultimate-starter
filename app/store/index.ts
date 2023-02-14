import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {createSlices} from './slices';
import getMiddlewaresArray from './middlewares';
import {createTransform, persistStore, persistReducer} from 'redux-persist';
import {migrations} from './migrations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {slicesArray} from './defaultStoreData';
import omit from 'lodash/omit';
import initSubscriber from 'redux-subscriber';
import config from '../config';
import BLACKLIST from './persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const ENABLE_PERSIST = config.enableReduxPersist;

const createSlicesReducers = (slices: object, _combineReducers: Function) => {
  let slicesReducers = {};
  Object.keys(slices).map(slice => {
    //@ts-ignore
    slicesReducers[slices[slice].name] = slices[slice].reducer;
  });
  return _combineReducers(slicesReducers);
};

const createReducer = (slices: object, _combineReducers: Function) => {
  const entitiesReducer = createSlicesReducers(slices, _combineReducers);
  return _combineReducers({
    entities: entitiesReducer,
  });
};

type StoreConfig = {
  slices: object;
  reducer: object;
  _configureStore: Function;
  _persistReducer: Function;
  _persistStore: Function;
  _storage: object;
  _getMiddlewaresArray: Function;
};

const configurePosteStore = ({
  slices,
  reducer,
  _configureStore,
  _persistReducer,
  _persistStore,
  _storage,
  _getMiddlewaresArray,
}: StoreConfig) => {
  const blacklistTransform = createTransform(
    (inboundState: object, key: string | number) => {
      if (key === 'entities') {
        return omit(inboundState, BLACKLIST);
      } else {
        return {...inboundState};
      }
    },
  );

  const persistConfig = {
    key: 'entities',
    storage: _storage,
    transforms: [blacklistTransform],
    version: 0,
    migrate: migrations,
  };

  const persistedReducer = ENABLE_PERSIST
    ? _persistReducer(persistConfig, reducer)
    : reducer;

  let store = _configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: Function) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(_getMiddlewaresArray(slices)),
  });
  /**
   * getDefaultMiddleware adds thunk by default since thunks are the basic recommended side effects middleware for Redux :)
   */

  let persistor = ENABLE_PERSIST ? _persistStore(store) : null;
  initSubscriber(store);

  return {persistor, store};
};

const createStore = () => {
  const appsSlices = createSlices(slicesArray);
  const reducer = createReducer(appsSlices, combineReducers);
  const slices = appsSlices;

  const storeConfig = {
    slicesArray: slicesArray,
    slices,
    reducer: reducer,
    _configureStore: configureStore,
    _persistStore: persistStore,
    _storage: AsyncStorage,
    _persistReducer: persistReducer,
    _getMiddlewaresArray: getMiddlewaresArray,
  };

  const {store, persistor} = configurePosteStore(storeConfig);
  store.slices = slices;
  store.persistor = persistor;

  return {slices, store, persistor};
};

export const defaultStore = createStore();
export type RootState = ReturnType<typeof defaultStore.store.getState>;
export type AppDispatch = typeof defaultStore.store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
