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
    if (!this.alreadyCreated) this.createHabitRegistry();
    else this.updateHabitRegistry();
  }

  //! For now you cannot update
  updateHabitRegistry() {
    [...this.habitRegistryMap.values()]
      .map((hr) => {
        return { ...hr, value: Number(hr.value) };
      })
      .forEach((hr) => {
        const { habitId, ...body } = hr;
        this._habitRegistryService
          .updateHabitRegistry(String(habitId), body)
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
          next: ({ result: habitR }) => {
            this.alreadyCreated = true;
            const hregs = this._dashboardStore.habitRegistries;
            hregs?.push(habitR);
            this._dashboardStore.habitRegistries = hregs;
          },
        });
      });
    this._moodRegistryService.createMoodRegistry(this.moodRegistry).subscribe({
      next: ({ result: moodR }) => {
        this.alreadyCreated = true;
        const moodRegs = this._dashboardStore.moodRegistries;
        moodRegs?.push(moodR);
        this._dashboardStore.moodRegistries = moodRegs;
      },
    });
  }

  initializeHabitRegistryMap(registries?: IHabitRegistry[]) {
    this.habitRegistryMap.clear();
    this.habits.forEach((h) => {
      this.habitRegistryMap.set(h.id, {
        habitId: h.id,
        date: format(this.selectedDate, 'MM-dd-yyyy'),
        value: registries?.find((r) => r.habitId === h.id)
          ? registries.find((r) => r.habitId === h.id)!.value
          : 0,
      });
    });
  }

  initializeMoodRegistry(mood?: IMoodRegistry) {
    this.moodRegistry = {
      date: format(this.selectedDate, 'MM-dd-yyyy'),
      value: mood ? mood.value : 0,
      observations: mood ? mood.observations : '',
      userId: this._dashboardStore.selectedUser?.id!,
    };
  }

  initializeTodayHabits(habits: IHabit[]) {
    const dayNumber = this.selectedDate.getDay();
    const transformedDayNumber = dayNumber === 0 ? 7 : dayNumber;
    this.habits = habits.filter((h) =>
      h.weekDays.includes(transformedDayNumber)
    );
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
        this.initializeTodayHabits(res || []);
        this.initializeHabitRegistryMap();
      },
    });
    this._dashboardStore.habitsRegistries$.subscribe({
      next: (res) => {
        const registries =
          res?.filter((r) => isSameDay(new Date(r.date), this.selectedDate)) ??
          [];
        this.alreadyCreated = !!registries.length;
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
    this.initializeTodayHabits(this._dashboardStore.habits || []);
    this.updateRegistryData();
  }
}
