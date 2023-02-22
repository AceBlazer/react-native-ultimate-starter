//@ts-ignore
import {AsyncThunk, createAsyncThunk, RejectWithValue} from '@reduxjs/toolkit';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AxiosResponse} from 'axios';
import {RootState} from '..';
import {httpProvider} from '../../config';
import {RequestArgs} from '../../types/http.type';

/**
 * !this should be dispatched only from services
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
    'thunk/fetchData',
    async (
      args: RequestArgs,
      {rejectWithValue}: BaseThunkAPI<RootState, any, any, any>,
    ) => {
      try {
        if (args.url.length === 0) {
          throw new Error('fetchData thunk error: url is empty');
        }
        const responseData = await httpProvider.sendHttpRequest<R>(args);
        return responseData;
      } catch (error: any) {
        return rejectWithValue(
          error?.message ?? 'fetchData thunk unknown error',
        );
      }
    },
  );
