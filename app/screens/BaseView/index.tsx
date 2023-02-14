import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../hooks/config/useTheme';
import {STATUSBAR_HEIGHT} from '../../utilities/dimensions';

interface IBaseViewProps {}

export default function BaseView({
  children,
}: PropsWithChildren<IBaseViewProps>) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
  },
});
