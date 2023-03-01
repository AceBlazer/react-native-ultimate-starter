import uuid from 'react-native-uuid';
import services from '../services';
import {TransactionState} from '../store/slices/reducers/transaction.reducer';

export const getBaseTransactionDispatchPayload = (
  service: keyof typeof services,
): TransactionState => {
  return {
    id: uuid.v4() as string,
    timestamp: Date.now(),
    service,
    payload: {},
  };
};
