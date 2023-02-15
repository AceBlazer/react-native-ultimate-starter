import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, Modal, Text} from 'react-native';
import useTheme from '../../hooks/config/useTheme';
import {useAppSelector} from '../../store';
import {
  globalErrorSelector,
  globalLoaderSelector,
} from '../../store/selectors/global.selectors';
import {STATUSBAR_HEIGHT} from '../../utilities/dimensions';

interface IBaseViewProps {}

export default function BaseView({
  children,
}: PropsWithChildren<IBaseViewProps>) {
  const {colors} = useTheme();

  const globalLoader = useAppSelector<boolean>(globalLoaderSelector);
  const globalError = useAppSelector<string | null>(globalErrorSelector);

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {children}
      </View>

      {/* the below jsx is used for debugging purposes, to be removed */}
      {globalLoader && (
        <Modal>
          <View style={{flex: 1}}>
            <Text>Loading...</Text>
          </View>
        </Modal>
      )}

      {globalError && (
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View
            style={{
              overflow: 'hidden',
              borderRadius: 6,
              backgroundColor: 'white',
              elevation: 2,
              borderLeftWidth: 5,
              width: '90%',
              height: 70,
              padding: 10,
            }}>
            <Text>{globalError}</Text>
          </View>
        </View>
      )}
      {/* end of to be removed */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
  },
});
