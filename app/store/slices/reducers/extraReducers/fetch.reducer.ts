import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {RootState} from '../../..';
import {fetchData} from '../../../thunks/fetch.thunk';

const fetchReducer = (builder: ActionReducerMapBuilder<Partial<RootState>>) => {
  builder.addCase(fetchData().pending, state => {
    state.pending = true;
  });
  builder.addCase(fetchData().fulfilled, (state, action) => {
    if (action.payload) {
      state.data = state.data.concat(action.payload);
    }
    state.pending = false;
    state.error = null;
  });
  builder.addCase(fetchData().rejected, (state, action) => {
    state.pending = false;
    state.error = action.payload;
  });
};

export default fetchReducer;
