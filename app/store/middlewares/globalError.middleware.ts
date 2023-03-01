import {Middleware} from '@reduxjs/toolkit';
import {RootState} from '..';
import {updateGlobalError} from '../slices/actions/global.actions';

const globalErrorMiddleware: (slices: any) => Middleware<{}, RootState> =
  _slices => store => next => async action => {
    if (action.type === 'thunk/fetchData/rejected') {
      store.dispatch(updateGlobalError(action.payload));
    }

    return next(action);
  };

export default globalErrorMiddleware;
