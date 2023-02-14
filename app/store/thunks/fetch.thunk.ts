//@ts-ignore
import {AsyncThunk, createAsyncThunk, RejectWithValue} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {httpProvider} from '../../config';
import {RequestArgs} from '../../types/http.type';

/**
 * !this should be dispatched only by services
 */

/**
 * because we need a generic here we added a closure to do that
 * when we reference fetchData, we need to execute it to get the async thunk inside the closure
 */
export const fetchData = <R>(): AsyncThunk<
  AxiosResponse<R> | RejectWithValue,
  RequestArgs,
  any
> =>
  createAsyncThunk(
    'thunk/config/fetchData',
    async (
      args: RequestArgs,
      {rejectWithValue}: {rejectWithValue: RejectWithValue},
    ) => {
      try {
        if (args.url.length === 0) {
          rejectWithValue('fetchData thunk error: url is empty');
        }
        return await httpProvider.sendHttpRequest<R>(args);
      } catch (error: any) {
        rejectWithValue(error?.message ?? 'fetchData thunk unknown error');
      }
    },
  );
