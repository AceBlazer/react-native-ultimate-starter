import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit';
import globalErrorMiddleware from './globalError.middleware';
import globalLoaderMiddleware from './globalLoader.middleware';
import transactionMiddleware from './transaction.middleware';

const middlewares: Array<(slices: any) => Middleware> = [
  globalLoaderMiddleware,
  globalErrorMiddleware,
  transactionMiddleware,
];

const getMiddlewaresArray =
  (_middlewares: Array<(slices: any) => Middleware>) =>
  (slices: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
    return _middlewares.map(middleware => {
      return middleware(slices);
    });
  };

export default getMiddlewaresArray(middlewares);
