import { Component, OnInit } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import { IHabitRegistry } from '@shared/interfaces/habit.interface';

@Component({
  selector: 'app-main-graph',
  standalone: true,
  imports: [],
  templateUrl: './main-graph.component.html',
  styleUrl: './main-graph.component.scss',
})
export class MainGraphComponent implements OnInit {
  habitRegistries!: IHabitRegistry[];

  constructor(private _dashboardStore: DashboardStore) {}

  ngOnInit(): void {
    this.setupSubscribers();
  }

  setupSubscribers() {
    this._dashboardStore.habitsRegistries$.subscribe({
      next: (res) => {
        this.habitRegistries = res as IHabitRegistry[];
      },
    });
  }
}
