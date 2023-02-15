import {RootState} from '..';

const globalLoaderSelector = (store: RootState): boolean =>
  store.entities.global.loader;

const globalErrorSelector = (store: RootState): string | null =>
  store.entities.global.error;

export {globalLoaderSelector, globalErrorSelector};
