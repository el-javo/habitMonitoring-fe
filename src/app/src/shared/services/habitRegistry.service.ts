import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { IResponse } from '@core/services/api.interfaces';
import {
  IHabitRegistry,
  IHabitRegistryBody,
} from '@shared/interfaces/habit.interface';

@Injectable()
export class HabitRegistryService {
  private path = 'habitRegistries';
  constructor(private _api: ApiService<IHabitRegistry>) {}

  listHabitRegistries(userId: number): Observable<IResponse<IHabitRegistry[]>> {
    return this._api.list(this.path + `?userId=${userId}`) as Observable<
      IResponse<IHabitRegistry[]>
    >;
  }

  readHabitRegistry(id: string): Observable<IResponse<IHabitRegistry>> {
    return this._api.read(id) as Observable<IResponse<IHabitRegistry>>;
  }

  createHabitRegistry(
    body: IHabitRegistryBody
  ): Observable<IResponse<IHabitRegistry>> {
    return this._api.create(this.path, body) as Observable<
      IResponse<IHabitRegistry>
    >;
  }

  updateHabitRegistry(
    id: string,
    body: object
  ): Observable<IResponse<IHabitRegistry>> {
    return this._api.update(this.path, id, body) as Observable<
      IResponse<IHabitRegistry>
    >;
  }

  deleteHabitRegistry(id: string): Observable<IResponse<IHabitRegistry>> {
    return this._api.delete(this.path, id) as Observable<
      IResponse<IHabitRegistry>
    >;
  }
}
