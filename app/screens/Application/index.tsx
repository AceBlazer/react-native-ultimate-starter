import React, {PropsWithChildren, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import OfflineNotice from '../../components/shared/OfflineNotice';
import useTheme from '../../hooks/config/useTheme';
import {fonts} from '../../config/fonts';
import config from '../../config';
import services from '../../services';
import {useAppSelector} from '../../store';
import {PostResponse, PostsResponse} from '../../types/settings.type';
import {postsSelector} from '../../store/selectors/settings.selectors';
import {appLogger} from '../../services/logger/logger.service';
import {LOGGER_LEVELS} from '../../config/logger';
import connectedUser from '../../singletons/user/user.singleton';
import {UserInfo} from '../../types/user.type';

interface IApplicationProps {}

export default function Application({}: PropsWithChildren<IApplicationProps>) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const posts = useAppSelector<PostsResponse>(postsSelector);

  useEffect(() => {
    //simulating user login
    const userInfo: UserInfo = {
      loginID: 'aceBlazer',
      userID: 'JASSER',
    };
    connectedUser.setUserInfo(userInfo);

    //testing logger
    appLogger.debug('this is a test debug log');
    appLogger
      .api(LOGGER_LEVELS.SETTINGS)
      .info('this is a test info log for api: SETTINGS');

    //testing service
    if (posts.length === 0) {
      services.settings.fetchPosts();
    }
  }, []);

  return (
    <View style={[styles.container]}>
      {/* the below jsx is used for debugging purposes, to be removed */}
      <View style={styles.body}>
        <Text style={[styles.text, {color: colors.text}]}>
          {t('test.hello')}
        </Text>

        <Text style={[styles.text, {color: colors.text}]}>
          {config.baseURL + ''}
        </Text>

        {posts.length > 0 &&
          posts.map((post: PostResponse, index: number) => (
            <View key={index + ''}>
              <Text style={{color: colors.warning}}>{post.title}</Text>
            </View>
          ))}
      </View>
      {/* end of to be removed */}
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
