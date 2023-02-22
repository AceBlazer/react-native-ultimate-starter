import {NetInfoState, useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../../hooks/config/useTheme';
import {useAppDispatch, useAppSelector} from '../../../store';
import {connectivitySelector} from '../../../store/selectors/connectivity.selectors';
import {updateConnectivity} from '../../../store/slices/actions/connectivity.actions';

const OfflineNotice = () => {
  const netInfo = useNetInfo();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const connectivity = useAppSelector<NetInfoState>(connectivitySelector);

  useEffect(() => {
    if (netInfo.isConnected !== null) {
      dispatch(updateConnectivity(netInfo));
    }
  }, [netInfo.isConnected]);

  if (!(connectivity.isConnected && connectivity.isInternetReachable)) {
    return (
      <View style={(styles.container, {backgroundColor: colors.danger})} />
    );
  }
  // used for debugging purposes
  // return <View style={[styles.container, {backgroundColor: colors.success}]} />;
  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 8,
    width: '100%',
    bottom: 0,
    zIndex: 1,
  },
});

export default OfflineNotice;
