import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import fetchReducer from './extraReducers/fetch.reducer';

export type SettingsState = {
  data: Array<any>;
  error: any;
  pending: boolean;
};

const initialState: SettingsState = {
  data: [],
  error: null,
  pending: false,
};

const settings = {
  initialState,
  reducers: {
    settingsReset: () => {
      return initialState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SettingsState>) => {
    fetchReducer(builder);
  },
};

export default settings;
