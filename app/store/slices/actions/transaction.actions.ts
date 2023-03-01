import {defaultStore} from '../..';
import {TransactionState} from '../reducers/transaction.reducer';

const {reset, transactionUpdated} = defaultStore.slices.transaction.actions;

const updateTransaction = (payload: TransactionState) => {
  return {
    type: transactionUpdated.type,
    payload,
  };
};

const resetTransaction = () => {
  return {
    type: reset.type,
  };
};

export {updateTransaction, resetTransaction};
