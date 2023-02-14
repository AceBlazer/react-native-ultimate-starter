import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../../hooks/config/useTheme';

const OfflineNotice = () => {
  const netInfo = useNetInfo();
  const [offline, setOffline] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    if (netInfo.isConnected === false) {
      setOffline(true);
      return;
    }
    if (offline) {
      setOffline(false);
    }
  }, [netInfo.isConnected]);

  if (offline) {
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
