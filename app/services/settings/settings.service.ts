import {API} from '../../constants/endpoints';
import {defaultStore} from '../../store';
import {fetchData} from '../../store/thunks/fetch.thunk';
import {RequestArgs} from '../../types/http.type';
import {PostsResponse} from '../../types/settings.type';

const settingsService = {
  fetchPosts: () => {
    const fetchPostsData = fetchData<PostsResponse>();
    const params: RequestArgs = {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/todos',
      // url: API.auth.login,
    };
    defaultStore.store.dispatch(fetchPostsData(params));
  },
};

export default settingsService;
