import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from 'axios';
import { Observable, Subscriber } from 'rxjs';

export interface RxAxiosConfig extends AxiosRequestConfig {
  localCache?: boolean;
}

export class RxAxios {
  private _httpClient: AxiosInstance;

  constructor(options: RxAxiosConfig = {}) {
    this._httpClient = axios.create(options);
  }

  public get<T = any>(url: string, queryParams?: object) {
    return this._makeRequest<T>('GET', url, { params: queryParams });
  }

  public post<T = any>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('POST', url, { params: queryParams }, body);
  }

  public put<T = any>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PUT', url, { params: queryParams }, body);
  }

  public patch<T = any>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PATCH', url, { params: queryParams }, body);
  }

  public delete<T = any>(url: string, queryParams?: object) {
    return this._makeRequest<T>('DELETE', url, { params: queryParams });
  }

  public request<T = any>(config: AxiosRequestConfig): Observable<T> {
    const request = this._httpClient.request(config);
    return this._toObservable(request);
  }

  private _makeRequest<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
    body?: object
  ) {
    const request = this._builderHttp<T>(method, url, config, body);
    return this._toObservable(request);
  }

  private _toObservable<T>(request: AxiosPromise<T>): Observable<T> {
    return new Observable<T>((subscriber: Subscriber<T>) => {
      request
        .then((response: AxiosResponse) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
        .catch((err: Error) => {
          subscriber.error(err);
          subscriber.complete();
        });
    });
  }

  private _builderHttp<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
    body?: object
  ): AxiosPromise<T> {
    switch (method) {
      case 'GET':
        return this._httpClient.get<T>(url, config);

      case 'POST':
        return this._httpClient.post<T>(url, body, config);

      case 'PUT':
        return this._httpClient.put<T>(url, body, config);

      case 'PATCH':
        return this._httpClient.patch<T>(url, body, config);

      case 'DELETE':
        return this._httpClient.delete(url, config);

      default:
        throw new Error('Method not supported');
    }
  }
}
