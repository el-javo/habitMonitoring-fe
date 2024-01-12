import { Injectable } from '@angular/core';
import { IHabit, IHabitRegistry } from '@shared/interfaces/habit.interface';
import { IMoodRegistry } from '@shared/interfaces/mood.interface';
import { IUser } from '@shared/interfaces/user.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  onDestroy$ = new Subject<void>();

  private _selectedUser = new BehaviorSubject<IUser | undefined>(undefined);
  get selectedUser() {
    return this._selectedUser.value;
  }
  get selectedUser$() {
    return this._selectedUser.asObservable();
  }
  set selectedUser(newSelectedUser) {
    this._selectedUser.next(newSelectedUser);
  }

  private _users = new BehaviorSubject<IUser[] | undefined>(undefined);
  get users() {
    return this._users.value;
  }
  get users$() {
    return this._users.asObservable();
  }
  set users(newUsers) {
    this._users.next(newUsers);
  }

  private _habits = new BehaviorSubject<IHabit[] | undefined>(undefined);
  get habits() {
    return this._habits.value;
  }
  get habits$() {
    return this._habits.asObservable();
  }
  set habits(newhabits) {
    this._habits.next(newhabits);
  }

  private _habitRegistries = new BehaviorSubject<IHabitRegistry[] | undefined>(
    undefined
  );
  get habitRegistries() {
    return this._habitRegistries.value;
  }
  get habitsRegistries$() {
    return this._habitRegistries.asObservable();
  }
  set habitRegistries(newhabitRegistries) {
    this._habitRegistries.next(newhabitRegistries);
  }

  private _moodRegistries = new BehaviorSubject<IMoodRegistry[] | undefined>(
    undefined
  );
  get moodRegistries() {
    return this._moodRegistries.value;
  }
  get moodRegistries$() {
    return this._moodRegistries.asObservable();
  }
  set moodRegistries(newMoodRegistries) {
    this._moodRegistries.next(newMoodRegistries);
  }
}
