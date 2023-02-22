import {AnyAction} from '@reduxjs/toolkit';
import {includeAction, UndoableOptions} from 'redux-undo';

const UNDOABLE_SLICES = new Map<
  string,
  UndoableOptions<unknown, AnyAction> | undefined
>();

const commonOptions: Partial<UndoableOptions<unknown, AnyAction> | undefined> =
  {
    initTypes: ['@@redux-undo/INIT'],
    debug: false,
    ignoreInitialState: true,
    neverSkipReducer: false,
    syncFilter: false,
  };

/**
 * settings
 */

UNDOABLE_SLICES.set('settings', {
  limit: 2,
  filter: includeAction([
    'thunk/fetchData/pending',
    'thunk/fetchData/rejected',
    'thunk/fetchData/fulfilled',
  ]),
  //groupBy: to group multiple actions into single step in history
  undoType: 'settings/undo',
  redoType: 'settings/redo',
  jumpType: 'settings/jump',
  jumpToPastType: 'settings/jumpPast',
  jumpToFutureType: 'settings/jumpFuture',
  clearHistoryType: 'settings/clearHistory',
  ...commonOptions,
});

export {UNDOABLE_SLICES};
