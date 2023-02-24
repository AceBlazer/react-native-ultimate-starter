import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkError} from '../exceptions';
// import {baseURL, httpTimeout, clientCacheDuration} from '../../../config';
import {LOGGER_LEVELS} from '../../../config/logger';
import {appLogger} from '../../logger/logger.service';
import {setupCache} from 'axios-cache-adapter';
import config from '../../../config';

console.log('clientCacheDuration', config.clientCacheDuration);

// const cache = setupCache({
//   maxAge: clientCacheDuration,
// });

const appAxios = axios.create({
  // baseURL: baseURL,
  // timeout: httpTimeout,
  // adapter: clientCacheDuration ? cache.adapter : axios.defaults.adapter,
});

appAxios.interceptors.request.use(
  async _config => {
    appLogger.api(LOGGER_LEVELS.AXIOS).info('axios request started', _config);

    const token = await AsyncStorage.getItem('token');
    if (token) {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    return _config;
  },
  error => {
    appLogger
      .api(LOGGER_LEVELS.AXIOS)
      .error('axios request ended with error', error.message, error);
    return Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  response => {
    appLogger.api(LOGGER_LEVELS.AXIOS).info('axios request ended', response);
    return response;
  },
  async error => {
    appLogger
      .api(LOGGER_LEVELS.AXIOS)
      .error('axios request ended with error', error.message, error);
    if (!error.response) {
      return Promise.reject(new NetworkError());
    }
    throw error.response;
  },
);

let cancelTokenSource = axios.CancelToken.source();
const axiosCancel = () => {
  const resetCancelToken = () => {
    cancelTokenSource.cancel('HTTP Request canceled');
    cancelTokenSource = axios.CancelToken.source();
  };
  const getCancelToken = () => {
    return cancelTokenSource.token;
  };
  return {
    resetCancelToken,
    getCancelToken,
  };
};
/**
 * used to cancel ongoing http request
 * exp: click cancel button to abort transaction
 */
const cancelHTTPRequest = () => {
  try {
    axiosCancel().resetCancelToken();
  } catch (error) {
    throw error;
    // appLogger.error('CancelHTTPRequest---------', error);
  }
};
appAxios.prototype.cancelHTTPRequest = cancelHTTPRequest;

export default appAxios;
