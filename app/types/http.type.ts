import {AxiosHeaders} from 'axios';

export type RequestArgs = {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: AxiosHeaders | {[key: string]: any};
  body?: any;
};

type HttpRequest = <R>(args: RequestArgs) => Promise<R> | undefined;

export type HttpProvider = {
  sendHttpRequest: HttpRequest;
};

export interface IHttpService {
  sendRequest: HttpRequest;
}

export type StorageTokens = {
  token: string | null;
  refreshToken: string | null;
};

export enum HttpProviderOptions {
  AXIOS = 'axios',
  APISAUCE = 'apisauce',
}

export type HttpProviders = {[key in HttpProviderOptions]: HttpProvider | null};
