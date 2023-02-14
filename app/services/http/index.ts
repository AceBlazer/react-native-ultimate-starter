import config from '../../config';
import {HttpService} from './httpService';

function httpInstance() {
  const {httpProvider} = config;
  const _http = new HttpService();
  _http.setProvider(httpProvider);
  return _http;
}

export default httpInstance;
