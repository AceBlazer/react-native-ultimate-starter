import {NetInfoState} from '@react-native-community/netinfo';
import {RootState} from '..';

const connectivitySelector = (store: RootState): NetInfoState =>
  store.entities.connectivity;

export {connectivitySelector};
