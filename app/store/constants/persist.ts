import {PersistMigrate} from 'redux-persist';
import {RootState} from '..';

export const MIGRATIONS: PersistMigrate = (state: RootState) => {
  return Promise.resolve({
    ...state,
    entities: {
      ...state.entities,
      settings: {
        ...state.entities.settings,
        past: [],
        future: [],
        _lastUnfiltered: null,
        index: 0,
        limit: 1,
      },
    },
  });
};

export const BLACKLIST = ['connectivity'];
