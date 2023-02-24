import {HttpProvider, IHttpService, RequestArgs} from '../../types/http.type';

export class HttpService implements IHttpService {
  protected provider!: HttpProvider; //required

  // DI
  public setProvider(provider: HttpProvider): void {
    const callerName = new Error().stack?.split('\n')[2].trim().split(' ')[1];
    if (callerName !== 'httpInstance') {
      throw new Error(
        'unauthorized caller, setProvider should be only called from httpInstance',
      );
    }

    this.provider = provider;
  }

  public sendRequest = <R>(args: RequestArgs) => {
    return this.provider.sendHttpRequest<R>(args);
  };
}
