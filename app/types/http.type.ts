import {AxiosHeaders} from 'axios';

export type RequestArgs = {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: AxiosHeaders | {[key: string]: any};
  body?: any;
};

export type HttpProvider = {
  // get: (url: string, config: object) => Promise<unknown> | undefined;
  // post: (url: string, config: object) => Promise<unknown> | undefined;
  // put: (url: string, config: object) => Promise<unknown> | undefined;
  // delete: (url: string, config: object) => Promise<unknown> | undefined;
  sendHttpRequest: <R>(args: RequestArgs) => Promise<R> | undefined;
};

export interface IHttpService {
  get: (url: string, config: object) => Promise<unknown> | undefined;
  post: (url: string, config: object) => Promise<unknown> | undefined;
  put: (url: string, config: object) => Promise<unknown> | undefined;
  delete: (url: string, config: object) => Promise<unknown> | undefined;
}

export type StorageTokens = {
  token: string | null;
  refreshToken: string | null;
};
