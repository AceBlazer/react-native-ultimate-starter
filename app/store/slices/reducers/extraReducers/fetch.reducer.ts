import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {RootState} from '../../..';
import {fetchData} from '../../../thunks/fetch.thunk';

const fetchReducer = (builder: ActionReducerMapBuilder<Partial<RootState>>) => {
  builder.addCase(fetchData().pending, state => {
    state.loading = true;
  });
  builder.addCase(fetchData().fulfilled, (state, action) => {
    if (action.payload) {
      state.data = state.data.concat(action.payload);
    }
    state.loading = false;
    state.error = null;
  });
  builder.addCase(fetchData().rejected, (state, action) => {
    state.loading = false;
    //@ts-ignore
    state.error = action.error.message;
  });
};

export default fetchReducer;
