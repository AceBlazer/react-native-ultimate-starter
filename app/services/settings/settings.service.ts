import {defaultStore} from '../../store';
import {updateTransaction} from '../../store/slices/actions/transaction.actions';
import {TransactionState} from '../../store/slices/reducers/transaction.reducer';
import uuid from 'react-native-uuid';

const getBaseTransactionDispatchPayload = (): TransactionState => {
  return {
    id: uuid.v4() as string,
    timestamp: Date.now(),
    payload: {},
  };
};

const settingsService = {
  fetchPosts: () => {
    const transactionPayload = {};
    const transactionDispatchPayload = {
      ...getBaseTransactionDispatchPayload(),
      payload: transactionPayload,
    };
    defaultStore.store.dispatch(updateTransaction(transactionDispatchPayload));
  },
};

export default settingsService;
