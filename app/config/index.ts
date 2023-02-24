import axiosProvider from '../services/http/providers/axios';
import colors from './colors';
import {resources} from './i18n';
import {
  REACT_APP_API_URL_DEV,
  REACT_APP_API_URL_PROD,
  REACT_APP_API_URL_STAGING,
  REACT_APP_API_URL_TEST,
  REACT_APP_ENVIRONMENT,
} from 'react-native-dotenv';
import {HttpProvider} from '../types/http.type';

const baseURLs = {
  development: REACT_APP_API_URL_DEV,
  production: REACT_APP_API_URL_PROD,
  staging: REACT_APP_API_URL_STAGING,
  testing: REACT_APP_API_URL_TEST,
};

const testModeEnabled = false; //true => show component in test screen
const baseURL = baseURLs[REACT_APP_ENVIRONMENT];
const httpTimeout = 30 * 1000; //timeout in ms
const enablePerformance = true; //enable log performance in seconds
const enableReduxPersist = false; //true => enable REDUX persists
const defaultTheme: keyof typeof colors = 'dark';
const defaultLanguage: keyof typeof resources = 'ar';
const httpProvider: HttpProvider = axiosProvider; //axios, apisauce...
const clientCacheDuration = 3600 * 1000; //http client cache maxAge in milliseconds. 0 => no cache
const appEnv = REACT_APP_ENVIRONMENT; //environment, used to condition cases to only work on dev
const showLogs = true; //show console logs in app logger

export default {
  testModeEnabled,
  enablePerformance,
  enableReduxPersist,
  defaultTheme,
  defaultLanguage,
  httpProvider,
  baseURL,
  httpTimeout,
  clientCacheDuration,
  appEnv,
  showLogs,
};
