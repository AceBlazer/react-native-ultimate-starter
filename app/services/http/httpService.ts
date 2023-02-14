import {HttpProvider, IHttpService} from '../../types/http.type';

export class HttpService implements IHttpService {
  protected provider!: HttpProvider; //required

  // DI
  public setProvider(provider: HttpProvider): void {
    this.provider = provider;
  }

  //implementations
  public get(url: string, config: object): Promise<unknown> | undefined {
    return this.provider.get(url, config);
  }
  public post(url: string, config: object): Promise<unknown> | undefined {
    return this.provider.post(url, config);
  }
  public put(url: string, config: object): Promise<unknown> | undefined {
    return this.provider.put(url, config);
  }
  public delete(url: string, config: object): Promise<unknown> | undefined {
    return this.provider.delete(url, config);
  }
}
