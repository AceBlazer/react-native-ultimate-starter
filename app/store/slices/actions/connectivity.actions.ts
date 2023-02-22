import {NetInfoState} from '@react-native-community/netinfo';
import {defaultStore} from '../..';

const {connectivityUpdated, reset} = defaultStore.slices.connectivity.actions;

const updateConnectivity = (payload: NetInfoState) => {
  return {
    type: connectivityUpdated.type,
    payload: payload,
  };
};

const resetGlobal = () => {
  return {
    type: reset.type,
  };
};

export {updateConnectivity, resetGlobal};
