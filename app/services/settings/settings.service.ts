import {getBaseTransactionDispatchPayload} from '../../helpers/getBaseTransactionDispatchPayload';
import {defaultStore} from '../../store';
import {updateTransaction} from '../../store/slices/actions/transaction.actions';

const settingsService = {
  fetchPosts: () => {
    const transactionPayload = {};
    const transactionDispatchPayload = {
      ...getBaseTransactionDispatchPayload('settings'),
      payload: transactionPayload,
    };
    defaultStore.store.dispatch(updateTransaction(transactionDispatchPayload));
  },
};

export default settingsService;
