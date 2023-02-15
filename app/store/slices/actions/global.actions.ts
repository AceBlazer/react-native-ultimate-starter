import {defaultStore} from '../..';
import {GlobalError} from '../reducers/global.reducer';

const {globalLoaderUpdated, globalErrorUpdated, globalReset} =
  defaultStore.slices.global.actions;

const updateGlobalLoader = (enabled: boolean) => {
  return {
    type: globalLoaderUpdated,
    payload: enabled,
  };
};

const updateGlobalError = (error: GlobalError) => {
  return {
    type: globalErrorUpdated,
    payload: error,
  };
};

const resetGlobal = () => {
  return {
    type: globalReset,
  };
};

export {updateGlobalLoader, updateGlobalError, resetGlobal};
