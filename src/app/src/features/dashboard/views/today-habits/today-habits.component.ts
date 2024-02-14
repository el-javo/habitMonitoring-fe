import { Component, OnInit } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import {
  IHabit,
  IHabitRegistry,
  IHabitRegistryBody,
} from '@shared/interfaces/habit.interface';
import {
  IMoodRegistry,
  IMoodRegistryBody,
} from '@shared/interfaces/mood.interface';
import { HabitRegistryService } from '@shared/services/habitRegistry.service';
import { MoodRegistryService } from '@shared/services/moodRegistry.service';
import { addDays, format, isSameDay } from 'date-fns';

@Component({
  selector: 'app-today-habits',
  templateUrl: './today-habits.component.html',
  styleUrl: './today-habits.component.scss',
})
export class TodayHabitsComponent implements OnInit {
  habits!: IHabit[];
  habitRegistryMap: Map<number, IHabitRegistryBody> = new Map();
  moodRegistry!: IMoodRegistryBody;
  maxDate = new Date();
  alreadyCreated = false;
  selectedDate = new Date();

  constructor(
    private _dashboardStore: DashboardStore,
    private _moodRegistryService: MoodRegistryService,
    private _habitRegistryService: HabitRegistryService
  ) {}
  ngOnInit(): void {
    this.setupSubscriptions();
  }
  createOrUpdateRegistry() {
    if (this.alreadyCreated) this.createHabitRegistry();
    else this.updateHabitRegistry();
  }

  updateHabitRegistry() {
    [...this.habitRegistryMap.values()]
      .map((hr) => {
        return { ...hr, value: Number(hr.value) };
      })
      .forEach((hr) => {
        this._habitRegistryService
          .updateHabitRegistry(String(hr.habitId), hr)
          .subscribe({
            next: (res) => {
              this.alreadyCreated = true;
            },
          });
      });
  }
  createHabitRegistry() {
    [...this.habitRegistryMap.values()]
      .map((hr) => {
        return { ...hr, value: Number(hr.value) };
      })
      .forEach((hr) => {
        this._habitRegistryService.createHabitRegistry(hr).subscribe({
          next: (res) => {
            this.alreadyCreated = true;
          },
        });
      });
    this._moodRegistryService.createMoodRegistry(this.moodRegistry).subscribe({
      next: (res) => {
        this.alreadyCreated = true;
      },
    });
  }

  initializeHabitRegistryMap(registries?: IHabitRegistry[]) {
    this.habitRegistryMap.clear();
    this.habits.forEach((h) => {
      this.habitRegistryMap.set(h.id, {
        habitId: h.id,
        date: format(new Date(), 'MM-dd-yyyy'),
        value: registries?.find((r) => r.habitId === h.id)
          ? registries.find((r) => r.habitId === h.id)!.value
          : 0,
      });
    });
  }

  initializeMoodRegistry(mood?: IMoodRegistry) {
    this.moodRegistry = {
      date: format(new Date(), 'MM-dd-yyyy'),
      value: mood ? mood.value : 0,
      observations: mood ? mood.observations : '',
      userId: this._dashboardStore.selectedUser?.id!,
    };
  }

  updateRegistryData() {
    const registries =
      this._dashboardStore.habitRegistries?.filter((r) =>
        isSameDay(new Date(r.date), this.selectedDate)
      ) ?? [];
    const mood = this._dashboardStore.moodRegistries?.find((m) =>
      isSameDay(new Date(m.date), this.selectedDate)
    );
    this.alreadyCreated = !!(registries.length || mood);
    this.initializeHabitRegistryMap(registries);
    this.initializeMoodRegistry(mood);
  }

  setupSubscriptions() {
    this._dashboardStore.habits$.subscribe({
      next: (res) => {
        this.habits = res as IHabit[];
        this.initializeHabitRegistryMap();
      },
    });
    this._dashboardStore.habitsRegistries$.subscribe({
      next: (res) => {
        const registries =
          res?.filter((r) => isSameDay(new Date(r.date), this.selectedDate)) ??
          [];
        this.initializeHabitRegistryMap(registries);
      },
    });
    this._dashboardStore.moodRegistries$.subscribe({
      next: (res) => {
        const mood = res?.find((m) =>
          isSameDay(new Date(m.date), this.selectedDate)
        );
        this.initializeMoodRegistry(mood);
      },
    });
  }

  addDaysToSelectedDate(nDays: number) {
    this.selectedDate = addDays(this.selectedDate, nDays);
    this.updateRegistryData();
  }
}
