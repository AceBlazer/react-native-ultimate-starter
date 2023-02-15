import {RootState} from '..';
import {PostsResponse} from '../../types/settings.type';

const postsSelector = (store: RootState): PostsResponse =>
  store.entities.settings.data;

export {postsSelector};
