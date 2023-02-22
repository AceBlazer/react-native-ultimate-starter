import {defaultStore} from '../..';
import {GlobalError} from '../reducers/global.reducer';

const {globalLoaderUpdated, globalErrorUpdated, reset} =
  defaultStore.slices.global.actions;

const updateGlobalLoader = (enabled: boolean) => {
  return {
    type: globalLoaderUpdated.type,
    payload: enabled,
  };
};

const updateGlobalError = (error: GlobalError) => {
  return {
    type: globalErrorUpdated.type,
    payload: error,
  };
};

const resetGlobal = () => {
  return {
    type: reset.type,
  };
};

export {updateGlobalLoader, updateGlobalError, resetGlobal};
