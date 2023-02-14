import {createSlice} from '@reduxjs/toolkit';
import * as slicesReducers from './reducers';

const sliceCreator = (
  name: string,
  _createSlice: Function,
  _slicesReducers: object = {},
) => {
  //@ts-ignore
  const sliceReducers = _slicesReducers[name];

  return _createSlice({
    name: name,
    ...sliceReducers,
  });
};

export const createSlices = (slicesArray: string[]) => {
  return slicesArray.reduce((acc: object, sliceName: string) => {
    const elementSlice = sliceCreator(sliceName, createSlice, slicesReducers);
    //@ts-ignore
    acc[sliceName] = elementSlice;
    return acc;
  }, {});
};
