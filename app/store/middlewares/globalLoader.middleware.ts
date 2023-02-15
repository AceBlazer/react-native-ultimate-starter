import {Middleware} from '@reduxjs/toolkit';
import {RootState} from '..';
import {updateGlobalLoader} from '../slices/actions/global.actions';

export const globalLoaderMiddleware: (
  slices: any,
) => Middleware<{}, RootState> = _slices => store => next => async action => {
  if (action.type === 'thunk/config/fetchData/pending') {
    console.log(action);

    store.dispatch(updateGlobalLoader(true));
  }
  if (action.type === 'thunk/config/fetchData/fulfilled') {
    store.dispatch(updateGlobalLoader(false));
  }
  if (action.type === 'thunk/config/fetchData/rejected') {
    store.dispatch(updateGlobalLoader(false));
  }

  return next(action);
};
