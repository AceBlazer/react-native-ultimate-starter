import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkError} from '../exceptions';
import {baseURL, httpTimeout} from '../../../config';

const appAxios = axios.create({
  baseURL: baseURL,
  timeout: httpTimeout,
});

appAxios.interceptors.request.use(
  async _config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    return _config;
  },
  error => {
    return Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
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
