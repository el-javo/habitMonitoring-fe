import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import { ChartOptions } from '@shared/apex-charts/apex.interfaces';
import { IHabit, IHabitRegistry } from '@shared/interfaces/habit.interface';
import { IMoodRegistry } from '@shared/interfaces/mood.interface';
import {
  chartConfig,
  primeBoilerData,
  primeChartConfig,
} from './config/chart.config';
import { addDays, format, getWeek } from 'date-fns';
import { getDay } from 'date-fns';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-main-graph',
  templateUrl: './main-graph.component.html',
  styleUrl: './main-graph.component.scss',
})
export class MainGraphComponent implements OnInit {
  habits!: IHabit[];
  habitsMap: Map<number, IHabit> = new Map();
  habitRegistries!: IHabitRegistry[];
  moodRegistries!: IMoodRegistry[];
  wait = false;
  dataRegistriesMap: Map<
    string,
    { habits: IHabitRegistry[]; mood?: IMoodRegistry }
  > = new Map<string, { habits: IHabitRegistry[]; mood?: IMoodRegistry }>();
  chartOptions: ChartOptions = chartConfig;
  primeData = primeBoilerData;
  @ViewChild('apexChart') apexChart!: ChartComponent;
  showChart = true;
  primeChartConfig = primeChartConfig;
  normalizeSelected = false;
  visualizationWeekly = false;
  visualizationOptions = [
    { label: 'Weekly', value: true },
    { label: 'Dialy', value: false },
  ];
  optionHabits: { label: string; value: number }[] = [];
  selectedHabits: number[] = [];

  constructor(private _dashboardStore: DashboardStore) {}

  ngOnInit(): void {
    this.buildView();
    this.setupSubscribers();
    this.updateCharts();
  }

  updateCharts() {
    if (this.wait) return;
    //refill the DataMap
    this.refillDataMap();
    this.updatePrimeBasicChart();
  }

  updatePrimeBasicChart() {
    const data = [...this.dataRegistriesMap.keys()]
      .sort((a: any, b: any) => {
        return this.visualizationWeekly
          ? Number(a) - Number(b)
          : new Date(a).getTime() - new Date(b).getTime();
      })
      .map((date) => {
        const register = this.dataRegistriesMap.get(date);
        const habitValue = register?.habits.reduce(
          (acc, curr) =>
            acc +
            (this.selectedHabits.includes(curr.habitId)
              ? curr.value * this.habitsMap.get(curr.habitId)?.weight!
              : 0),
          0
        ); //sum total habits
        const weekIterator = this.visualizationWeekly
          ? [...Array(6).keys()].map((i) => addDays(new Date(), i))
          : [new Date(date)];
        const habitMax = weekIterator.reduce(
          (prev, val) => prev + this.computeMaxValueForDate(val),
          0
        );
        const moodValue = register?.mood?.value;

        return { habitValue, habitMax, moodValue, date };
      });
    const habitData = data.map((d) => d.habitValue);
    const maxHabitData = data.map((d) => d.habitMax);
    const moodData = data.map((d) => d.moodValue);
    const labels = data.map((d) => d.date);
    const normalizedData = habitData.map((d, index) => {
      return maxHabitData[index] !== undefined && maxHabitData[index] !== 0
        ? (d ?? 0) / maxHabitData[index]
        : d
        ? 1
        : 0;
    });
    const normalizedMaxHabit = maxHabitData.map((e) => 1);
    this.primeData.labels = labels;
    this.primeData.datasets[0].data = this.normalizeSelected
      ? normalizedData
      : habitData;
    this.primeData.datasets[1].data = this.normalizeSelected
      ? normalizedMaxHabit
      : maxHabitData;
    this.primeData.datasets[2].data = moodData;
    this.refreshPChart();
  }

  computeMaxValueForDate(date: Date): number {
    return this.habits.reduce((acc, curr) => {
      if (
        curr.weekDays.includes(((getDay(date) + 6) % 7) + 1) &&
        this.selectedHabits.includes(curr.id)
      ) {
        //sorry for this but i work w [1-7] 1 = monday and datefns [0-6]  0 = sunday
        return acc + curr.weight;
      }
      return acc;
    }, 0);
  }

  refreshPChart() {
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true;
    });
  }

  refillDataMap() {
    const formatDate = this.visualizationWeekly
      ? (d: Date) => {
          return String(getWeek(d));
        }
      : (d: Date) => {
          return format(d, 'MM-dd-yyyy');
        };
    this.dataRegistriesMap.clear();
    this.habitRegistries.forEach((hr) => {
      const hrDate = new Date(hr.date);
      const stringDate = formatDate(hrDate);
      const dateReg = this.dataRegistriesMap.get(stringDate);
      if (!dateReg) {
        this.dataRegistriesMap.set(stringDate, { habits: [hr] });
      } else {
        dateReg.habits.push(hr);
        this.dataRegistriesMap.set(stringDate, dateReg);
      }
    });
    this.moodRegistries.forEach((mr) => {
      const mrDate = new Date(mr.date);
      const stringDate = formatDate(mrDate);
      const dateReg = this.dataRegistriesMap.get(stringDate);
      if (!dateReg) {
        this.dataRegistriesMap.set(stringDate, { habits: [], mood: mr });
      } else {
        dateReg.mood = mr;
      }
    });
  }

  buildView() {
    if (this._dashboardStore.habits)
      this.fillHabits(this._dashboardStore.habits!);
    if (this._dashboardStore.habitRegistries)
      this.fillHabitRegistries(this._dashboardStore.habitRegistries);
    if (this._dashboardStore.moodRegistries)
      this.fillMoodRegistries(this._dashboardStore.moodRegistries);
  }

  fillHabits(habits: IHabit[]) {
    this.habits = habits as IHabit[];
    this.habitsMap.clear();
    this.habits.forEach((h) => {
      this.habitsMap.set(h.id, h);
    });
    this.optionHabits = this.habits.map((h) => {
      return { label: h.name, value: h.id };
    });
    this.selectedHabits = this.habits.map((h) => h.id);
  }

  fillMoodRegistries(moodRegs: IMoodRegistry[]) {
    this.wait = !this.wait;
    this.moodRegistries = moodRegs as IMoodRegistry[];
    this.updateCharts();
  }

  fillHabitRegistries(habitRegs: IHabitRegistry[]) {
    this.habitRegistries = habitRegs as IHabitRegistry[];
    this.wait = !this.wait;
    this.updateCharts();
  }

  setupSubscribers() {
    this._dashboardStore.habitsRegistries$.subscribe({
      next: (res) => {
        if (res) this.fillHabitRegistries(res);
      },
    });
    this._dashboardStore.moodRegistries$.subscribe({
      next: (res) => {
        if (res) this.fillMoodRegistries(res);
      },
    });
    this._dashboardStore.habits$.subscribe({
      next: (res) => {
        if (res) this.fillHabits(res);
      },
    });
  }
}
