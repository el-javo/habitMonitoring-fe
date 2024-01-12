import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { IResponse } from '@core/services/api.interfaces';
import {
  IMoodRegistry,
  IMoodRegistryBody,
} from '@shared/interfaces/mood.interface';

@Injectable()
export class MoodRegistryService {
  private path = 'dayMoodRegistries';
  constructor(private _api: ApiService<IMoodRegistry>) {}

  listMoodRegistries(userId: number): Observable<IResponse<IMoodRegistry[]>> {
    return this._api.list(this.path + `?userId=${userId}`) as Observable<
      IResponse<IMoodRegistry[]>
    >;
  }

  readMoodRegistry(id: string): Observable<IResponse<IMoodRegistry>> {
    return this._api.read(id) as Observable<IResponse<IMoodRegistry>>;
  }

  createMoodRegistry(
    body: IMoodRegistryBody
  ): Observable<IResponse<IMoodRegistry>> {
    return this._api.create(this.path, body) as Observable<
      IResponse<IMoodRegistry>
    >;
  }

  updateMoodRegistry(
    id: string,
    body: object
  ): Observable<IResponse<IMoodRegistry>> {
    return this._api.update(this.path, id, body) as Observable<
      IResponse<IMoodRegistry>
    >;
  }

  deleteMoodRegistry(id: string): Observable<IResponse<IMoodRegistry>> {
    return this._api.delete(this.path, id) as Observable<
      IResponse<IMoodRegistry>
    >;
  }
}
