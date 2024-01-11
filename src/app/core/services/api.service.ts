import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { enviroment } from '@environments/enviroments';

import { IResponse } from './api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private apiUrl: string = enviroment.apiUrl;

  constructor(private http: HttpClient) {}

  list(path: string): Observable<IResponse<T[]>> {
    return this.http.get(`${this.apiUrl}/${path}`) as Observable<
      IResponse<T[]>
    >;
  }

  read(path: string, id?: string): Observable<IResponse<T>> {
    return this.http.get(
      `${this.apiUrl}/${path}${id ? '/' + id : ''}`
    ) as Observable<IResponse<T>>;
  }

  create(path: string, body: object): Observable<IResponse<T>> {
    return this.http.post(`${this.apiUrl}/${path}`, body) as Observable<
      IResponse<T>
    >;
  }

  update(path: string, id: string, body: object): Observable<IResponse<T>> {
    return this.http.put(
      `${this.apiUrl}/${path}${id ? '/' + id : ''}`,
      body
    ) as Observable<IResponse<T>>;
  }

  delete(path: string, id: string): Observable<IResponse<T>> {
    return this.http.delete(
      `${this.apiUrl}/${path}${id ? '/' + id : ''}`
    ) as Observable<IResponse<T>>;
  }
}
