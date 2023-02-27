import config from '../../../config';
import axiosProvider from './axios';
import {HttpProviders} from '../../../types/http.type';

export const getHttpProvider = () => {
  const options: HttpProviders = {
    axios: axiosProvider,
    apisauce: null,
  };
  return options[config.httpProvider];
};
