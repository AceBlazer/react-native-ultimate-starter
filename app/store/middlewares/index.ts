import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit';

const middlewares: Array<Middleware> = [];

const getMiddlewaresArray =
  (_middlewares: Array<Middleware>) =>
  (slices: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
    return _middlewares.map(middleware => {
      return middleware(slices);
    });
  };

export default getMiddlewaresArray(middlewares);
