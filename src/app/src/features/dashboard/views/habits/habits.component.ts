import { Component, OnInit } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import { IHabit } from '@shared/interfaces/habit.interface';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent implements OnInit {
  habits: IHabit[] = [];
  constructor(private _dashboardStore: DashboardStore) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }
  setupSubscriptions() {
    this._dashboardStore.habits$.subscribe({
      next: (res) => {
        this.habits = res as IHabit[];
      },
    });
  }
}
