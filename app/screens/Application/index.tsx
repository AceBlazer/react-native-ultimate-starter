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

interface IApplicationProps {}

export default function Application({}: PropsWithChildren<IApplicationProps>) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const posts = useAppSelector<PostsResponse>(postsSelector);

  useEffect(() => {
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
