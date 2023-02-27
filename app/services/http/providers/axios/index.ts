import {NetworkError, SessionExpiredError} from '../../exceptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isJwtExpired} from 'jwt-check-expiration';
import {AxiosNetworkResponse} from '../../../../types/axios.type';
import {UserResponse} from '../../../../types/auth.type';
import {API} from '../../../../constants/endpoints';
import axiosInstance from './interceptors';
import {
  HttpProvider,
  RequestArgs,
  StorageTokens,
} from '../../../../types/http.type';
import {defaultStore} from '../../../../store';

function axiosProvider(): HttpProvider {
  const getAuthTokens = async (): Promise<StorageTokens> => {
    const [token, refreshToken] = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('refresh_token'),
    ]);

    return {token, refreshToken};
  };

  const handleRefreshTokenSuccessResponse = async (
    response: AxiosNetworkResponse<UserResponse>,
  ) => {
    const userResponse = response.data.data;
    axiosInstance.defaults.headers.Authorization =
      'Bearer ' + userResponse.authToken;

    // Set new s3 cloud front cookies
    // if (userResponse.s3CloudFrontCookies) {
    //   store.dispatch(setS3CloudFrontCookies(userResponse.s3CloudFrontCookies));
    // }
    await AsyncStorage.setItem('token', userResponse.authToken);
  };

  const updateAuthTokenIfExpired = async (authTokens: StorageTokens) => {
    if (isJwtExpired(authTokens.token)) {
      if (isJwtExpired(authTokens.refreshToken)) {
        throw new SessionExpiredError();
      }

      try {
        const refreshTokenResponse: AxiosNetworkResponse<UserResponse> =
          await axiosInstance({
            url: API.auth.refreshToken,
            method: 'POST',
            data: {refreshToken: authTokens.refreshToken},
          });

        // Logger.info('REFRESHING TOKEN SUCCESS');
        await handleRefreshTokenSuccessResponse(refreshTokenResponse);
      } catch (err) {
        throw new SessionExpiredError();
      }
    }
  };

  const handleRequestSuccess = <T>(
    reqArgs: RequestArgs,
    statusCode: number,
    data: T,
  ) => {
    // Logger.info(
    //   `REQUEST SUCCESS => URL: ${reqArgs.url}, STATUS: ${statusCode}`,
    // );
    //end

    return data;
  };

  const handleRequestError = async (
    reqArgs: RequestArgs,
    statusCode: number,
    message?: string,
  ) => {
    // Logger.error(
    //   `REQUEST ERROR => URL: ${
    //     reqArgs.url
    //   }, STATUS: ${statusCode} | MESSAGE: ${message || 'No message.'}`,
    // );

    if (statusCode === 401 && !reqArgs.url.includes(API.auth.baseEndpoint)) {
      await handleSessionExpired();
      return;
    }

    return message;
  };

  const handleSessionExpired = async () => {
    // Logger.info('SESSION EXPIRED');
    await AsyncStorage.multiRemove(['token', 'refresh_token']);
  };

  const handleRequest = <T>(args: RequestArgs): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const res: AxiosNetworkResponse<T> = await axiosInstance({
          url: args.url,
          method: args.method,
          data: args.body || null,
          params: args.headers?.params,
        });

        if (!res.data) {
          reject('no data object in response');
        }
        return resolve(
          handleRequestSuccess<T>(args, res.data.statusCode, res.data as T),
        );
      } catch (error: any) {
        //end
        const errorResponse = error?.data;
        if (errorResponse) {
          reject(
            await handleRequestError(
              args,
              errorResponse.statusCode,
              errorResponse.message,
            ),
          );
        }

        reject(error);
      }
    });
  };

  const sendHttpRequest = <T>(args: RequestArgs): Promise<T> => {
    const callerName = new Error().stack?.split('\n')[2].trim().split(' ')[1];
    if (callerName !== 'HttpService.sendRequest') {
      throw new Error(
        'unauthorized caller, sendHttpRequest should be only called from HttpService',
      );
    }

    return new Promise<T>(async (resolve, reject) => {
      const networkStatus = defaultStore.store.getState().entities.connectivity;
      if (!(networkStatus.isConnected && networkStatus.isInternetReachable)) {
        return reject(new NetworkError());
      }

      const authTokens = await getAuthTokens();
      const isAuthenticated = authTokens.token && authTokens.refreshToken;

      if (isAuthenticated) {
        try {
          await updateAuthTokenIfExpired(authTokens);
        } catch (err) {
          if (err instanceof SessionExpiredError) {
            await handleSessionExpired();
          }
          return;
        }
      }
      resolve(handleRequest(args));
    });
  };

  return {sendHttpRequest};
}

export default axiosProvider();
