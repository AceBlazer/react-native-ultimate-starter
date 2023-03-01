import {PayloadAction} from '@reduxjs/toolkit';

export type TransactionPayload = {};

export type TransactionState = {
  id: string;
  timestamp: number;
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
      return action.payload;
    },

    reset: () => {
      return initialState;
    },
  },
};

export default transaction;
