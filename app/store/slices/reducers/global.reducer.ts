import {PayloadAction} from '@reduxjs/toolkit';

export type GlobalError = string | null;

export type GlobalSliceState = {
  loader: boolean;
  error: GlobalError;
};

const initialState: GlobalSliceState = {
  loader: false,
  error: null,
};

const global = {
  initialState,
  reducers: {
    globalLoaderUpdated: (
      state: GlobalSliceState,
      action: PayloadAction<boolean>,
    ) => {
      //state is immutable, we cant modify loader directly like state.loader = x
      return {...state, loader: action.payload};
    },
    globalErrorUpdated: (
      state: GlobalSliceState,
      action: PayloadAction<GlobalError>,
    ) => {
      return {...state, error: action.payload};
    },
    reset: () => {
      return initialState;
    },
  },
};

export default global;
