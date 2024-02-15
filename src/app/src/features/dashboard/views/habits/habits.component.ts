import { Component, OnInit } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import { IHabit, IHabitBody } from '@shared/interfaces/habit.interface';
import { HabitsService } from '@shared/services/habit.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent implements OnInit {
  habits: IHabitBody[] = [];
  typeOptions = [
    { label: 'value', value: false },
    { label: 'on/off', value: true },
  ];
  weekDayOptions = [
    { label: 'monday', value: 1 },
    { label: 'tuesday', value: 2 },
    { label: 'wednesday', value: 3 },
    { label: 'thursday', value: 4 },
    { label: 'friday', value: 5 },
    { label: 'saturday', value: 6 },
    { label: 'sunday', value: 7 },
  ];
  deletedHabitsIdList: number[] = [];
  constructor(
    private _dashboardStore: DashboardStore,
    private _habitsService: HabitsService
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  removeHabit(idx: number) {
    if (this.habits[idx]?.id) {
      this.deletedHabitsIdList.push(this.habits[idx].id!);
    }
    this.habits.splice(idx, 1);
  }

  addHabit() {
    this.habits.push({
      name: 'new Name',
      isBoolean: true,
      weight: 1,
      userId: this._dashboardStore.selectedUser?.id!,
      weekDays: [1, 2, 3, 4, 5, 6, 7],
    });
  }

  saveHabits() {
    const allCalls: Observable<any>[] = [];
    this.deletedHabitsIdList.forEach((id) => {
      allCalls.push(this._habitsService.deleteHabit(String(id)));
    });
    this.habits.forEach((h) => {
      if (h.id) {
        const { id, ...bodyNoId } = h;
        allCalls.push(this._habitsService.updateHabit(String(id), bodyNoId));
      } else {
        h.userId = this._dashboardStore.selectedUser?.id!;
        allCalls.push(this._habitsService.createHabit(h));
      }
    });
    forkJoin(allCalls).subscribe({
      next: console.log,
      error: console.error,
      complete: () => {
        console.log('update/create/delete succesfull');
        this._habitsService
          .listHabits(this._dashboardStore.selectedUser?.id!)
          .subscribe({
            next: ({ result: habits }) => {
              this._dashboardStore.habits = habits;
            },
          });
      },
    });
  }

  setupSubscriptions() {
    this._dashboardStore.habits$.subscribe({
      next: (res) => {
        this.habits = res as IHabit[];
      },
    });
  }
}
