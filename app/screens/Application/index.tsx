import React, {PropsWithChildren, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import OfflineNotice from '../../components/shared/OfflineNotice';
import useTheme from '../../hooks/config/useTheme';
import {fonts} from '../../config/fonts';
import config from '../../config';
import services from '../../services';

interface IApplicationProps {}

export default function Application({}: PropsWithChildren<IApplicationProps>) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  useEffect(() => {
    services.settings.fetchPosts();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.body}>
        <Text style={[styles.text, {color: colors.text}]}>
          {t('test.hello')}
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          {config.baseURL + ''}
        </Text>
      </View>
      <OfflineNotice />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: fonts.montserrat.extraBold,
    fontSize: 20,
  },
});
