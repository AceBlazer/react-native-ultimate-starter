import {AxiosResponse} from 'axios';

export type AxiosType<T> = {
  statusCode: number;
  success: boolean;
  data: T;
  message?: string;
};

export type AxiosNetworkResponse<T> = AxiosResponse<AxiosType<T>>;
export type AxiosPromiseNetworkResponse<T> = Promise<AxiosNetworkResponse<T>>;
