import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { IResponse } from '@core/services/api.interfaces';
import { IHabit, IHabitBody } from '@shared/interfaces/habit.interface';

@Injectable()
export class HabitsService {
  private path = 'habits';
  constructor(private _api: ApiService<IHabit>) {}

  listHabits(userId: number): Observable<IResponse<IHabit[]>> {
    const newPath = this.path + `?userId=${userId}`;
    return this._api.list(newPath) as Observable<IResponse<IHabit[]>>;
  }

  readHabit(id: string): Observable<IResponse<IHabit>> {
    return this._api.read(id) as Observable<IResponse<IHabit>>;
  }

  createHabit(body: IHabitBody): Observable<IResponse<IHabit>> {
    return this._api.create(this.path, body) as Observable<IResponse<IHabit>>;
  }

  updateHabit(id: string, body: object): Observable<IResponse<IHabit>> {
    return this._api.update(this.path, id, body) as Observable<
      IResponse<IHabit>
    >;
  }

  deleteHabit(id: string): Observable<IResponse<IHabit>> {
    return this._api.delete(this.path, id) as Observable<IResponse<IHabit>>;
  }
}
