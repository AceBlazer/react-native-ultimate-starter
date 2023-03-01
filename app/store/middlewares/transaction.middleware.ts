import {Middleware} from '@reduxjs/toolkit';
import {RootState} from '..';
import {RequestArgs} from '../../types/http.type';
import {PostsResponse} from '../../types/settings.type';
import {resetTransaction} from '../slices/actions/transaction.actions';
import {fetchData} from '../thunks/fetch.thunk';

const transactionMiddleware: (slices: any) => Middleware<{}, RootState> =
  _slices => store => next => async action => {
    if (action.type === 'transaction/transactionUpdated') {
      const fetchPostsData = fetchData<PostsResponse>();
      const params: RequestArgs = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos',
        // url: API.auth.login,
      };
      store.dispatch<any>(fetchPostsData(params));
    }

    if (action.type === 'thunk/fetchData/fulfilled') {
      store.dispatch<any>(resetTransaction());
    }

    if (action.type === 'thunk/fetchData/rejected') {
      store.dispatch<any>(resetTransaction());
    }

    return next(action);
  };

export default transactionMiddleware;
