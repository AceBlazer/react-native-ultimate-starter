import {PersistMigrate} from 'redux-persist';
import {RootState} from '..';

export const migrations: PersistMigrate = (state: RootState) => {
  return Promise.resolve({
    ...state,
  });
};
