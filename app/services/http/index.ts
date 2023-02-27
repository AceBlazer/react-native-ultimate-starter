import {HttpService} from './httpService';
import {getHttpProvider} from './providers';

function httpInstance() {
  const httpProvider = getHttpProvider();
  if (!httpProvider) {
    throw new Error(
      'could not instantiate http provider, NULL \n (consider adding it to options object and HttpProviders type)',
    );
  }
  const _http = new HttpService();
  _http.setProvider(httpProvider);
  return _http;
}

export default httpInstance();
