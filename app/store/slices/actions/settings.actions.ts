/**
 * !Rule for this to strictly respect:
 * actions should be in past tense, please make sure
 * they respect this rule in the reducer
 */

import {defaultStore} from '../..';

/**
 * here we don't use action creators because we used createSlice
 * which makes it easier to get get actions from reducer definition
 */

const {reset} = defaultStore.slices.settings.actions;

const undoSettings = () => {
  return {
    type: 'settings/undo',
  };
};

const redoSettings = () => {
  return {
    type: 'settings/redo',
  };
};

const resetSettings = () => {
  return {
    type: reset.type,
  };
};

export {undoSettings, redoSettings, resetSettings};
