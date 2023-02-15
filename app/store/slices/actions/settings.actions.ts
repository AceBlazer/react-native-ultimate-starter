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

const {settingsReset} = defaultStore.slices.settings.actions;

const resetSettings = () => {
  return {
    type: settingsReset,
  };
};

export {resetSettings};
