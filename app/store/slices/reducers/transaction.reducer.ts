import {PayloadAction} from '@reduxjs/toolkit';
import {LOGGER_LEVELS} from '../../../config/logger';
import services from '../../../services';
import {appLogger} from '../../../services/logger/logger.service';

export type TransactionPayload = {};

export type TransactionState = {
  id: string;
  timestamp: number;
  service: keyof typeof services;
  payload: TransactionPayload;
};

const initialState: TransactionState | null = null;

const transaction = {
  initialState,
  reducers: {
    transactionUpdated: (
      state: TransactionState,
      action: PayloadAction<TransactionState>,
    ) => {
      appLogger
        .api(LOGGER_LEVELS.TRANSACTION)
        .info('adding transaction', action.payload);
      return action.payload;
    },

    reset: () => {
      appLogger.api(LOGGER_LEVELS.TRANSACTION).info('resetting transaction');
      return initialState;
    },
  },
};

export default transaction;
