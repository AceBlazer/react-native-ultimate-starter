import {NetInfoState} from '@react-native-community/netinfo';
import {PayloadAction} from '@reduxjs/toolkit';

const initialState: Partial<NetInfoState> = {
  isConnected: true,
  isInternetReachable: true,
  isWifiEnabled: true,
};

const connectivity = {
  initialState,
  reducers: {
    connectivityUpdated: (
      state: NetInfoState,
      action: PayloadAction<NetInfoState>,
    ) => {
      return {...state, ...action.payload};
    },

    reset: () => {
      return initialState;
    },
  },
};

export default connectivity;
