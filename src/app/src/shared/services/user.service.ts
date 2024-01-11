import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { IUser, IUserBody } from '@shared/interfaces/user.interface';
import { IResponse } from '@core/services/api.interfaces';

@Injectable()
export class UserService {
  private path = 'users';
  constructor(private _api: ApiService<IUser>) {}

  listUsers(): Observable<IResponse<IUser[]>> {
    return this._api.list(this.path) as Observable<IResponse<IUser[]>>;
  }

  readUser(id: string): Observable<IResponse<IUser>> {
    return this._api.read(id) as Observable<IResponse<IUser>>;
  }

  createUser(userBody: IUserBody): Observable<IResponse<IUser>> {
    return this._api.create(this.path, userBody) as Observable<
      IResponse<IUser>
    >;
  }

  updateUser(id: string, body: object): Observable<IResponse<IUser>> {
    return this._api.update(this.path, id, body) as Observable<
      IResponse<IUser>
    >;
  }

  deleteUser(id: string): Observable<IResponse<IUser>> {
    return this._api.delete(this.path, id) as Observable<IResponse<IUser>>;
  }
}
