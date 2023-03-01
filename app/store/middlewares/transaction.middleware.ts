import {Middleware} from '@reduxjs/toolkit';
import {RootState} from '..';
import {LOGGER_LEVELS} from '../../config/logger';
import {appLogger} from '../../services/logger/logger.service';
import {RequestArgs} from '../../types/http.type';
import {PostsResponse} from '../../types/settings.type';
import {resetTransaction} from '../slices/actions/transaction.actions';
import {fetchData} from '../thunks/fetch.thunk';

const transactionMiddleware: (slices: any) => Middleware<{}, RootState> =
  _slices => store => next => async action => {
    const {transactionUpdated} = _slices.transaction.actions;

    if (action.type === transactionUpdated.type) {
      const fetchPostsData = fetchData<PostsResponse>();
      const params: RequestArgs = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos',
        // url: API.auth.login,
      };
      appLogger
        .api(LOGGER_LEVELS.TRANSACTION)
        .debug(
          'transaction started: detected new transaction to be added, sending request',
          params,
        );
      store.dispatch<any>(fetchPostsData(params));
    }

    if (action.type === 'thunk/fetchData/fulfilled') {
      appLogger
        .api(LOGGER_LEVELS.TRANSACTION)
        .debug('transaction ended: detected fulfilled request');
      store.dispatch<any>(resetTransaction());
    }

    if (action.type === 'thunk/fetchData/rejected') {
      appLogger
        .api(LOGGER_LEVELS.TRANSACTION)
        .error('transaction ended: detected rejected request');
      store.dispatch<any>(resetTransaction());
    }

    return next(action);
  };

export default transactionMiddleware;
