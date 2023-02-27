import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkError, TimeoutError} from '../../exceptions';
import config from '../../../../config';
import {LOGGER_LEVELS} from '../../../../config/logger';
import {appLogger} from '../../../logger/logger.service';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: config.httpTimeout,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  response => {
    appLogger.api(LOGGER_LEVELS.AXIOS).info('axios request ended', response);
    return response;
  },
  async error => {
    appLogger
      .api(LOGGER_LEVELS.AXIOS)
      .error('axios request ended with error', error.message, error);

    if (
      error.code === 'ECONNABORTED' &&
      (error.message as string).includes('timeout')
    ) {
      throw new TimeoutError();
    }
    if (!error.response) {
      throw new NetworkError();
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
axiosInstance.prototype.cancelHTTPRequest = cancelHTTPRequest;

export default axiosInstance;
